import React from "react";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { z } from "zod";
import { OpeningSloganScene } from "./OpeningSloganScene";
import { WhatIsScene } from "./WhatIsScene";
import { ContrastScene } from "./ContrastScene";
import { FeaturesListScene } from "./FeaturesListScene";
import { CTAScene } from "./CTAScene";
import { ProductTrailerPropsType } from "./types";

// Scene durations (in frames @ 30fps)
const SCENE_DURATION = 60; // 2s per scene
const TRANSITION_FRAMES = 12;


// Product Trailer composition showing all scene templates
export const ProductTrailer: React.FC<ProductTrailerPropsType> = ({
  productName,
  sloganEn,
  sloganCn,
  tagline,
  painPoint,
  painPointSub,
  solution,
  solutionSub,
  features,
  ctaText,
  ctaSubText,
}) => {
  return (
    <TransitionSeries>
      {/* Scene 1: Opening Slogan */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <OpeningSloganScene
          sloganEn={sloganEn}
          sloganCn={sloganCn}
          brandName={productName.toUpperCase()}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 2: What is it */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <WhatIsScene productName={productName} tagline={tagline} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 3: Contrast */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <ContrastScene
          painPoint={painPoint}
          painPointSub={painPointSub}
          solution={solution}
          solutionSub={solutionSub}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 4: Features List */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION + features.length * 15}>
        <FeaturesListScene features={features} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 180 }, durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 5: CTA */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <CTAScene ctaText={ctaText} subText={ctaSubText} productName={productName} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

// Export scene components for individual use
export { OpeningSloganScene } from "./OpeningSloganScene";
export { WhatIsScene } from "./WhatIsScene";
export { ContrastScene } from "./ContrastScene";
export { FeaturesListScene } from "./FeaturesListScene";
export { CTAScene } from "./CTAScene";

