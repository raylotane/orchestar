"use client";

import React, { useEffect, useMemo } from "react";
import { Player } from "@remotion/player";
import { CoffeeBrandVideo } from "@/app/remotion/CoffeeBrand";
import { EcommerceShowcase } from "@/app/remotion/EcommerceShowcase";

const sceneMap = {
  CoffeeBrandVideo,
  EcommerceShowcase,
};

export interface IVideoContainerProps {
  videoInfo: any;
}

const VideoContainer: React.FC<IVideoContainerProps> = ({ videoInfo }) => {
  const { sceneProps, sceneMeta, sceneId } = videoInfo || {};

  const {
    durationInFrames: DURATION_IN_FRAMES,
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  } = sceneMeta || {};

  useEffect(() => {
    console.log("sceneProps", videoInfo);
  }, [videoInfo]);

  const applyScene: React.FC<any> = useMemo(() => {
    return sceneMap[sceneId as keyof typeof sceneMap];
  }, [sceneId]);


  if (!sceneProps || !sceneMeta || (!sceneMap[sceneId as keyof typeof sceneMap])) {
    return null;
  }


  return (
    <div>
      <div className="max-w-screen-md m-auto mb-5 px-4">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            component={applyScene}
            inputProps={sceneProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            acknowledgeRemotionLicense
            style={{
              // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
              // but not over inline styles
              width: "100%",
            }}
            controls
            autoPlay
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
