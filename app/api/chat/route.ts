import { deepseek } from "@ai-sdk/deepseek";
import { convertToModelMessages, tool, ToolLoopAgent, UIMessage } from "ai";
import { sceneRegistry } from "@/lib/scene-registry";
import { coffeeSceneDef } from "@/app/remotion/CoffeeBrand/types"
import z from "zod";


sceneRegistry.register(coffeeSceneDef)

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
  inputSchema: z.object({
  }),
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
    getCurrentScene
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = await mainAgent.stream({
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}