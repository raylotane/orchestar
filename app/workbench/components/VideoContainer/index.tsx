"use client";

import React from "react";
import { Player } from "@remotion/player";
import { initScene } from "@/app/types/constants";
import { CoffeeBrandVideo } from "@/app/remotion/CoffeeBrand";

const VideoContainer: React.FC = () => {
  const { props, meta } = initScene;

  const {
    durationInFrames: DURATION_IN_FRAMES,
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  } = meta;

  return (
    <div>
      <div className="max-w-screen-md m-auto mb-5 px-4">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            component={CoffeeBrandVideo}
            inputProps={props}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
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
