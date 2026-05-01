"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";

export interface IChatInputProps extends React.HTMLAttributes<HTMLDivElement> {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onChatSubmit: ({ text }: { text: string }) => void;
}

const ChatInput: React.FC<IChatInputProps> = ({
  className,
  prompt,
  setPrompt,
  onChatSubmit,
  ...rest
}) => {
  const handleSubmit = () => {
    onChatSubmit({ text: prompt });
    setPrompt("");
  };

  return (
    <div className={cn(className)}>
      <InputGroup className={cn()}>
        <InputGroupTextarea
          className="min-h-[70px] max-h-[70px]"
          placeholder="请输入您的创意描述..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></InputGroupTextarea>
        <InputGroupAddon align="block-end" className="justify-end">
          <Button onClick={() => handleSubmit()}>
            <Navigation />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default ChatInput;
