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
  // sceneId: COFFEE_COMP_NAME,
  // sceneProps: defaultCoffeeBrandProps,
  // sceneMeta: {
  //   durationInFrames: COFFEE_DURATION_IN_FRAMES,
  //   fps: 30,
  //   width: 1280,
  //   height: 720,
  // },
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
