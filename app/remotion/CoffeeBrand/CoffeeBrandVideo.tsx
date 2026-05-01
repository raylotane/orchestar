import React from "react";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { z } from "zod";
import { OpeningScene } from "./OpeningScene";
import { SloganScene } from "./SloganScene";
import { FeaturesScene } from "./FeaturesScene";
import { ClosingScene } from "./ClosingScene";
import { CoffeeBrandProps } from "../../types/constants";

// Scene durations (in frames @ 30fps)
const OPENING_DURATION = 90;   // 3s
const SLOGAN_DURATION = 120;   // 4s
const FEATURES_DURATION = 120; // 4s
const CLOSING_DURATION = 120;   // 4s

const TRANSITION_FRAMES = 18;

export const CoffeeBrandVideo: React.FC<z.infer<typeof CoffeeBrandProps>> = ({
  brandName,
  tagline,
}) => {
  return (
    <TransitionSeries>
      {/* Scene 1: Opening - Brand reveal with coffee cup */}
      <TransitionSeries.Sequence durationInFrames={OPENING_DURATION}>
        <OpeningScene brandName={brandName} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 2: Slogan / Tagline */}
      <TransitionSeries.Sequence durationInFrames={SLOGAN_DURATION}>
        <SloganScene tagline={tagline} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 3: Features */}
      <TransitionSeries.Sequence durationInFrames={FEATURES_DURATION}>
        <FeaturesScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 180 }, durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 4: Closing / CTA */}
      <TransitionSeries.Sequence durationInFrames={CLOSING_DURATION}>
        <ClosingScene brandName={brandName} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
