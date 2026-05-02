"use client";

import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatContainer from "./components/ChatContainer";
import VideoContainer from "./components/VideoContainer";
import {
  COFFEE_COMP_NAME,
  COFFEE_DURATION_IN_FRAMES,
  defaultCoffeeBrandProps,
} from "../remotion/CoffeeBrand/types";
import { SceneDefinition } from "../types/constants";
import z from "zod";

export const initScene: Partial<z.infer<typeof SceneDefinition>> = {
  sceneId: "CoffeeBrandVideo",
  sceneProps: {
    brandName: "茶语时光",
    tagline: "每一杯，都是治愈的味道",
    features: [
      {
        icon: "🍓",
        title: "鲜果茶饮",
        desc: "当季新鲜水果，每一口都是自然的馈赠",
      },
      {
        icon: "🧋",
        title: "Q弹珍珠",
        desc: "手工熬煮黑糖珍珠，嚼劲十足",
      },
      {
        icon: "🥛",
        title: "醇厚奶盖",
        desc: "新西兰进口奶油，绵密丝滑",
      },
      {
        icon: "🧊",
        title: "冰爽一夏",
        desc: "夏日限定冰沙系列，清凉解暑",
      },
    ],
    socialPlatform: "@茶语时光",
  },
  sceneMeta: {
    durationInFrames: 300,
    fps: 30,
    width: 1920,
    height: 1080,
  },
};

const page: React.FC = () => {
  const [videoInfo, setVideoInfo] = useState(initScene);

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel minSize={"38.2%"} maxSize={"38.2%"}>
          <ChatContainer videoInfo={videoInfo} setVideoInfo={setVideoInfo} />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-neutral-500" />
        <ResizablePanel>
          <VideoContainer videoInfo={videoInfo} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default page;
