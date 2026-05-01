"use client";

import React, { useState } from "react";
import ChatInput from "./components/ChatInput";
import { useChat } from "@ai-sdk/react";
import MessageContainer from "./components/MessageContainer";

const ChatContainer: React.FC = () => {
  const [prompt, setPrompt] = useState("");

  const { messages, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-full gap-2 py-2">
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
