"use client";

import React, { useState } from "react";
import ChatInput from "./components/ChatInput";
import { useChat } from "@ai-sdk/react";
import MessageContainer from "./components/MessageContainer";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { applyPatch, Operation } from "rfc6902";

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

  const { messages, sendMessage, addToolOutput } = useChat({
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
          const patchedProps = JSON.parse(JSON.stringify(videoInfo));
          const errors = applyPatch(patchedProps, patch as Operation[]);
          const success = errors.length === 0;
          toolCallInfo.output = {
            sceneId: videoInfo.sceneId,
            sceneProps: patchedProps,
            success,
            appliedPatches: success ? patch.length : 0,
            errors: errors.length > 0 ? errors.map(String) : undefined,
          };
          setVideoInfo(patchedProps);
          break;
        }
      }
      addToolOutput(toolCallInfo);
    },
  });

  return (
    <div className="flex flex-col gap-2 py-2 h-full">
      <MessageContainer className="px-2 flex-1" messages={messages} />

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
