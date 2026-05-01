import { deepseek } from "@ai-sdk/deepseek";
import { convertToModelMessages, ToolLoopAgent, UIMessage } from "ai";

const mainAgent = new ToolLoopAgent({
  model: deepseek('deepseek-reasoner'),
  instructions: '你是 Orchestar · 灵阵 平台的AI助手，你的名字叫做小灵。',
  tools: {
  }
});

export async function POST(req: Request) {
  const { messages, modelId }: { messages: UIMessage[]; modelId?: string } = await req.json();
  const result = await mainAgent.stream({
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}