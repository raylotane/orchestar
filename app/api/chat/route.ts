import { deepseek } from "@ai-sdk/deepseek";
import { convertToModelMessages, ToolLoopAgent, UIMessage } from "ai";
import { sceneRegistry } from "@/lib/scene-registry";
import { coffeeSceneDef } from "@/app/remotion/CoffeeBrand/types"


sceneRegistry.register(coffeeSceneDef)

const SCENE_CONTEXT = sceneRegistry.toSystemPrompt()


const mainAgent = new ToolLoopAgent({
  model: deepseek('deepseek-reasoner'),
  instructions: [
    "你是 Orchestar · 灵阵 平台的 AI 助手，你的名字叫做小灵。",
    "",
    SCENE_CONTEXT,
    "",
    "当用户想要创建视频时，请根据他们的描述生成对应的场景属性（scene props）。",
    "你可以使用 generateSceneProps 工具来为用户生成视频场景的配置参数。",
  ].join("\n"),
  tools: {
    /**
     * 根据用户意图生成指定场景的 props 配置。
     * AI 调用此工具后返回的 props 可直接传给 Remotion 渲染引擎使用。
     */
    // generateSceneProps: {
    //   description:
    //     "根据用户需求生成视频场景的具体参数（props）。选择合适的模板并填充品牌信息、文案、视觉元素等。",
    //   parameters: {
    //     type: "object",
    //     properties: {
    //       sceneId: {
    //         type: "string",
    //         description: "目标场景 ID，如 CoffeeBrandVideo",
    //       },
    //       userDescription: {
    //         type: "string",
    //         description: "用户的自然语言需求描述",
    //       },
    //     },
    //     required: ["sceneId", "userDescription"],
    //   },
    //   execute: async ({ sceneId, userDescription }) => {
    //     const scene = sceneRegistry.get(sceneId);
    //     if (!scene) {
    //       return { error: `未找到场景: ${sceneId}`, availableScenes: sceneRegistry.list().map((s) => s.id) };
    //     }

    //     // 返回场景 schema 和默认值，由 LLM 基于这些结构生成具体 props
    //     // 实际生产中可接入二次 LLM 调用做 structured output
    //     return {
    //       sceneId,
    //       name: scene.name,
    //       description: scene.description,
    //       propsSchema: scene.propsSchema.shape,   // zod shape 供参考
    //       defaultProps: scene.defaultProps,       // 默认值作为基线
    //       meta: scene.meta,
    //       hint: `已返回 ${scene.name} 的默认配置与字段定义。请基于 userDescription 为用户填充各字段的合理值。`,
    //     };
    //   },
    // },

    /** 列出所有可用视频模板 */
    // listScenes: {
    //   description: "列出所有可供选择的视频模板/场景",
    //   parameters: {
    //     type: "object",
    //     properties: {},
    //   },
    //   execute: async () => {
    //     const scenes = sceneRegistry.list();
    //     return scenes.map((s) => ({
    //       id: s.id,
    //       name: s.name,
    //       description: s.description,
    //       duration: `${s.meta.durationInFrames} frames @ ${s.meta.fps ?? 30}fps`,
    //       resolution: `${s.meta.width ?? 1280}x${s.meta.height ?? 720}`,
    //     }));
    //   },
    // },
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = await mainAgent.stream({
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}