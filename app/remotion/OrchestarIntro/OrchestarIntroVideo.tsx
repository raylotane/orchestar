import React from "react";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { z } from "zod";
import { TitleScene } from "./TitleScene";
import { PainPointScene } from "./PainPointScene";
import { ContrastTitleScene } from "./ContrastTitleScene";
import { ProductDemoScene } from "./ProductDemoScene";
import { AIArrangeScene } from "./AIArrangeScene";
import { PreviewScene } from "./PreviewScene";
import { ExportScene } from "./ExportScene";
import { OutroScene } from "./OutroScene";
import { OrchestarIntroProps } from "./types";

// Scene durations (in frames @ 30fps)
const TITLE_DURATION = 60;         // 2s - typewriter question
const PAIN_POINT_DURATION = 45;    // 1.5s - fast montage
const CONTRAST_DURATION = 60;      // 2s - scene change
const PRODUCT_DEMO_DURATION = 75;  // 2.5s - screen recording
const AI_ARRANGE_DURATION = 45;    // 1.5s - timeline visualization
const PREVIEW_DURATION = 45;       // 1.5s - playback
const EXPORT_DURATION = 45;         // 1.5s - progress bar
const OUTRO_DURATION = 75;          // 2.5s - CTA

const TRANSITION_FRAMES = 12;

export const OrchestarIntroVideo: React.FC<z.infer<typeof OrchestarIntroProps>> = ({
  productName,
  sloganCn,
}) => {
  return (
    <TransitionSeries>
      {/* Scene 1: Title - typewriter question */}
      <TransitionSeries.Sequence durationInFrames={TITLE_DURATION}>
        <TitleScene
          text="做一条宣传视频，要多久？"
          durationInSeconds={2}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 2: Pain points - fast montage */}
      <TransitionSeries.Sequence durationInFrames={PAIN_POINT_DURATION}>
        <PainPointScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />

      {/* Scene 3: Contrast title - scene change */}
      <TransitionSeries.Sequence durationInFrames={CONTRAST_DURATION}>
        <ContrastTitleScene text="或者说句话的功夫" />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 4: Product demo - screen recording style */}
      <TransitionSeries.Sequence durationInFrames={PRODUCT_DEMO_DURATION}>
        <ProductDemoScene inputText="Orchestar，一个AI视频编排平台" />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 180 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />

      {/* Scene 5: AI Arrange - timeline visualization */}
      <TransitionSeries.Sequence durationInFrames={AI_ARRANGE_DURATION}>
        <AIArrangeScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 6: Preview - playback */}
      <TransitionSeries.Sequence durationInFrames={PREVIEW_DURATION}>
        <PreviewScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />

      {/* Scene 7: Export - progress bar */}
      <TransitionSeries.Sequence durationInFrames={EXPORT_DURATION}>
        <ExportScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 8: Outro - brand CTA */}
      <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
        <OutroScene sloganCn={sloganCn} productName={productName} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};