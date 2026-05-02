import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import React from "react";

import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { MessageSquare } from "lucide-react";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

export interface IMessageContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  messages: UIMessage[];
  onSendMessage?: (text: string) => void;
}

// 场景提示词示例
const SCENE_PROMPTS = [
  {
    icon: "🥤",
    shortDesc: "奶茶品牌宣传片",
    fullPrompt: `创作一个奶茶平台宣传片
品牌名：茶颜悦色
标语：一口茶香，回味悠长
特色：
* 🍵 现萃茶底 — 高山茶园直采，每日新鲜萃取
* 🧋 手作珍珠 — 黑糖手工熬煮，Q弹软糯
* 🥛 芝士奶盖 — 澳洲进口芝士，浓郁丝滑
* 🍑 鲜果系列 — 当季水果现切，清爽自然`,
  },
  {
    icon: "🌸",
    shortDesc: "美妆产品种草视频",
    fullPrompt: `创作一个美妆产品种草视频
品牌名：花西子
标语：东方彩妆，以花养妆
产品：雕花口红
特色：
* 🎨 传统雕花工艺 — 苗族非遗技术，立体雕刻
* 💄 持久显色 — 丝绒质地，一抹持久
* 🌿 天然成分 — 植物精粹，温和养护`,
  },
  {
    icon: "⚡",
    shortDesc: "科技产品发布会",
    fullPrompt: `创作一个科技产品发布会开场视频
品牌名：大疆
标语：未来无所不能
产品：Air 3 无人机
亮点：
* 📸 双主摄系统 — 哈苏镜头，1英寸CMOS
* ✈️ 46分钟续航 — 智能飞行电池
* 🎬 8K视频 — 专业级影像规格
* 🛡️ 全向避障 — 障碍物感知更精准`,
  },
  {
    icon: "🏠",
    shortDesc: "家居品牌广告",
    fullPrompt: `创作一个家居品牌广告视频
品牌名：宜家
标语：民主设计，人人可享
产品：弗洛特系列
特色：
* 💰 高性价比 — 简约设计，实用耐用
* 🌱 环保材料 — 可再生木材，环保漆料
* 📦 平板包装 — 轻松搬运，自主组装
* 🏠 北欧风格 — 明亮温馨，舒适自在`,
  },
];

const MessageContainer: React.FC<IMessageContainerProps> = ({
  className,
  messages,
  onSendMessage,
}) => {
  return (
    <div className={cn(className, "h-full overflow-x-hidden")}>
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState>
              <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                <div className="flex flex-col items-center gap-2 text-center">
                  <MessageSquare className="size-12 text-muted-foreground" />
                  <h3 className="font-medium text-lg">开始创作</h3>
                  <p className="text-muted-foreground text-sm">
                    选择一个场景，开始你的创作之旅
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {SCENE_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => onSendMessage?.(prompt.fullPrompt)}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-xl text-left",
                        "bg-card hover:bg-card/80 border border-border/50",
                        "transition-all duration-200 cursor-pointer",
                        "group"
                      )}
                    >
                      <span className="text-2xl shrink-0">{prompt.icon}</span>
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">
                          {prompt.shortDesc}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          点击发送完整提示词
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text": // we don't use any reasoning or tool calls in this example
                        return (
                          <MessageResponse key={`${message.id}-${i}`}>
                            {part.text}
                          </MessageResponse>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
};

export default MessageContainer;
