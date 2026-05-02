"use client";

import React, { useState } from "react";
import ChatInput from "./components/ChatInput";
import { useChat } from "@ai-sdk/react";
import MessageContainer from "./components/MessageContainer";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { applyPatch, Operation } from "rfc6902";
import { SceneDefinition } from "@/app/types/constants";
import { cn } from "@/lib/utils";

// 预设提示词
const PRESET_PROMPTS = [
  {
    icon: "🎬",
    text: "切换到电商展示场景",
  },
  {
    icon: "☕",
    text: "切换到咖啡品牌场景",
  },
  {
    icon: "📝",
    text: "帮我修改品牌名称",
  },
  {
    icon: "🎨",
    text: "调整一下配色方案",
  },
  {
    icon: "⏱️",
    text: "延长视频时长到5秒",
  },
];

// JSON Patch 操作类型 (RFC 6902)
type JsonPatchOperation = {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  path: string;
  value?: unknown;
  from?: string;
};

export interface IChatContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  videoInfo: any;
  setVideoInfo: (videoInfo: any) => void;
}

const ChatContainer: React.FC<IChatContainerProps> = ({
  videoInfo,
  setVideoInfo,
}) => {
  const [prompt, setPrompt] = useState("");

  const { messages, sendMessage, status: chatStatus, addToolOutput } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    onToolCall: ({ toolCall }) => {
      const { toolName, toolCallId, input } = toolCall;
      const toolInput = input as Record<string, unknown>;
      const toolCallInfo = {
        state: "output-available" as const,
        tool: toolName,
        toolCallId: toolCallId,
        output: "" as unknown,
      };
      switch (toolName) {
        case "getCurrentScene": {
          toolCallInfo.output = videoInfo;
          break;
        }
        case "patchSceneProps": {
          const { patch } = toolInput as {
            sceneId: string;
            patch: JsonPatchOperation[];
          };
          // const { sceneProps } = videoInfo;
          // rfc6902: 第一个参数会被直接修改，返回错误数组
          const patchedVideoInfo = JSON.parse(JSON.stringify(videoInfo));
          const errors = applyPatch(patchedVideoInfo, patch as Operation[]);
          const success = errors.length === 0;
          // 做 zod 验证
          const paramResult = SceneDefinition.safeParse(patchedVideoInfo);
          if (paramResult.success) {
            toolCallInfo.output = {
              sceneId: videoInfo.sceneId,
              sceneProps: patchedVideoInfo,
              success,
              appliedPatches: success ? patch.length : 0,
              errors: errors.length > 0 ? errors.map(String) : undefined,
            };
            setVideoInfo(patchedVideoInfo);
          } else {
            toolCallInfo.output = {
              sceneId: videoInfo.sceneId,
              sceneProps: patchedVideoInfo,
              success: false,
              error: paramResult.error,
            };
          }

          toolCallInfo.output = {
            sceneId: videoInfo.sceneId,
            sceneProps: patchedVideoInfo,
            success,
            appliedPatches: success ? patch.length : 0,
            errors: errors.length > 0 ? errors.map(String) : undefined,
          };
          setVideoInfo(patchedVideoInfo);
          break;
        }
        case "applyScene": {
          const checkResult = SceneDefinition.safeParse(toolInput);
          if (!checkResult.success) {
            toolCallInfo.output = {
              success: false,
              error: checkResult.error,
            };
            break;
          }

          toolCallInfo.output = {
            success: true,
            message: "场景应用成功",
          };
          setVideoInfo(toolInput);
          break;
        }
      }
      addToolOutput(toolCallInfo);
    },
  });

  return (
    <div className="flex flex-col gap-2 py-2 h-full">
      <MessageContainer
        className="px-2 flex-1"
        messages={messages}
        onSendMessage={(text) => sendMessage({ text })}
        chatStatus={chatStatus}
      />

      {/* 预设提示词 */}
      <div className="px-2 flex gap-2 overflow-x-auto">
        {PRESET_PROMPTS.map((preset, index) => (
          <button
            key={index}
            onClick={() => sendMessage({ text: preset.text })}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap",
              "bg-primary/10 hover:bg-primary/20 text-primary text-sm",
              "transition-colors cursor-pointer shrink-0"
            )}
          >
            <span>{preset.icon}</span>
            <span>{preset.text}</span>
          </button>
        ))}
      </div>

      <ChatInput
        className="px-2"
        prompt={prompt}
        setPrompt={setPrompt}
        onChatSubmit={({ text }) => sendMessage({ text })}
      />
    </div>
  );
};

export default ChatContainer;
