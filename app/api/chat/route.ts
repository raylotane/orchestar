import { deepseek } from "@ai-sdk/deepseek";
import { convertToModelMessages, tool, ToolLoopAgent, UIMessage } from "ai";
import { sceneRegistry } from "@/lib/scene-registry";
import { coffeeSceneDef } from "@/app/remotion/CoffeeBrand/types"
import { ecommerceSceneDef } from "@/app/remotion/EcommerceShowcase/types"
import z from "zod";
import { after } from "next/server";

import {
  observe,
  propagateAttributes,
  updateActiveObservation,
} from "@langfuse/tracing";
import { trace } from "@opentelemetry/api";
import { langfuseSpanProcessor } from "@/instrumentation";


sceneRegistry.register(coffeeSceneDef)
sceneRegistry.register(ecommerceSceneDef)


const SCENE_CONTEXT = sceneRegistry.toSystemPrompt()

const getScenePropsSchema = tool({
  description: "获取场景模版的schema，用于生成props",
  inputSchema: z.object({
    sceneId: z.string(),
  }),
  execute: async ({ sceneId }) => {
    const scene = sceneRegistry.get(sceneId);
    if (!scene) {
      return { error: `未找到场景: ${sceneId}`, availableScenes: sceneRegistry.list().map((s) => s.id) };
    }
    return scene.propsSchema
  },
})

const getCurrentScene = tool({
  description: "获取当前渲染的场景内容",
  inputSchema: z.object({}),
  outputSchema: z.object({
    sceneId: z.string().describe("场景ID"),
    sceneProps: z.object().describe("场景属性"),
    sceneMeta: z.object({
      durationInFrames: z.number(),
      fps: z.number(),
      width: z.number(),
      height: z.number(),
    }),
  }),
})

// JSON Patch 操作类型 (RFC 6902)
const jsonPatchOperationSchema = z.object({
  op: z.enum(["add", "remove", "replace", "move", "copy", "test"]),
  path: z.string().describe("操作路径，如 /sceneProps/brandName 路径应该根据 getCurrentScene 方法输入的 sceneProps 结构来定义"),
  value: z.unknown().optional().describe("op=add/replace/test 时需要"),
  from: z.string().optional().describe("op=move/copy 时需要源路径"),
})

const patchSceneProps = tool({
  description: "使用 JSON Patch (RFC 6902) 修改当前场景属性",
  inputSchema: z.object({
    sceneId: z.string().describe("场景ID"),
    patch: z.array(jsonPatchOperationSchema).describe("JSON Patch 操作数组"),
  }),
  outputSchema: z.object({
    sceneId: z.string(),
    sceneProps: z.object().describe("更新后的场景属性"),
    success: z.boolean(),
    appliedPatches: z.number().describe("成功应用的补丁数量"),
  }),
})

const mainAgent = new ToolLoopAgent({
  model: deepseek('deepseek-reasoner'),
  instructions: [
    "你是 Orchestar · 灵阵 平台的 AI 助手，你的名字叫做小灵。",
    "",
    SCENE_CONTEXT,
    "",
    "当用户想要创建视频时，请根据他们的描述生成对应的场景属性（scene props）。",
  ].join("\n"),
  tools: {
    getScenePropsSchema,
    getCurrentScene,
    patchSceneProps,
  },
  experimental_telemetry: {
    isEnabled: true,
  },
  onFinish: async (result) => {
    // Update trace with final output after stream completes
    updateActiveObservation({
      output: result.content,
    });
    // End span manually after stream has finished
    trace.getActiveSpan()?.end();
  },
});

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();
//   const result = await mainAgent.stream({
//     messages: await convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();
// }

const handler = async (req: Request) => {
  const { messages, chatId, userId }: { messages: UIMessage[], chatId: string; userId: string } = await req.json();
  // Set session id and user id on active trace
  const inputText = messages[messages.length - 1].parts.find(
    (part) => part.type === "text"
  )?.text;
  // Set input on the active trace
  updateActiveObservation({
    input: inputText,
  });

  // Add session and user context to the trace
  return propagateAttributes(
    {
      traceName: "chat-message",
      sessionId: chatId,  // Groups related messages together
      userId,             // Track which user made the request
    },
    async () => {
      const result = await mainAgent.stream({
        messages: await convertToModelMessages(messages),
      });

      // Critical for serverless: flush traces before function terminates
      after(async () => await langfuseSpanProcessor.forceFlush());
      return result.toUIMessageStreamResponse();
    }

  );

}


/**
 * Wrap handler with observe() to create a Langfuse trace
 * @see https://langfuse.com/integrations/frameworks/vercel-ai-sdk#create-api-route-with-streaming
 */
export const POST = observe(handler, {
  name: "handle-chat-message",
  endOnExit: false, // Don't end observation until stream finishes
});