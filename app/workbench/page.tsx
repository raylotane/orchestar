import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatContainer from "./components/ChatContainer";
import VideoContainer from "./components/VideoContainer";

const page: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel minSize={"38.2%"} maxSize={"38.2%"}>
          <ChatContainer />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-neutral-500" />
        <ResizablePanel>
          <VideoContainer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default page;
