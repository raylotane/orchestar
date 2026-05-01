"use client";

import React, { useState } from "react";
import ChatInput from "./components/ChatInput";
import { useChat } from "@ai-sdk/react";
import MessageContainer from "./components/MessageContainer";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";

export interface IChatContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  videoInfo: any;
}

const ChatContainer: React.FC<IChatContainerProps> = ({ videoInfo }) => {
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
        output: "",
      };
      switch (toolName) {
        case "getCurrentScene": {
          toolCallInfo.output = videoInfo;
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
