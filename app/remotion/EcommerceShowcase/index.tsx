import React from "react";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { ProductScene } from "./ProductScene";
import { FeaturesScene } from "./FeaturesScene";
import { PriceScene } from "./PriceScene";
import { ClosingScene } from "./ClosingScene";
import { EcommerceShowcaseProps, ECOMMERCE_COMP_NAME } from "./types";

// Scene durations (in frames @ 30fps)
const PRODUCT_DURATION = 120; // 4s
const FEATURES_DURATION = 150; // 5s
const PRICE_DURATION = 120; // 4s
const CLOSING_DURATION = 90; // 3s

const TRANSITION_FRAMES = 20;

export {
  ECOMMERCE_COMP_NAME,
  ECOMMERCE_DURATION_IN_FRAMES,
  defaultEcommerceShowcaseProps,
  ecommerceSceneDef,
} from "./types";

export const EcommerceShowcase: React.FC<EcommerceShowcaseProps> = ({
  productName,
  productCategory,
  price,
  originalPrice,
  description,
  features,
  brandName,
  discount,
  socialLinks,
}) => {
  return (
    <TransitionSeries>
      {/* Scene 1: Product reveal */}
      <TransitionSeries.Sequence durationInFrames={PRODUCT_DURATION}>
        <ProductScene
          productName={productName}
          productCategory={productCategory}
          brandName={brandName}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />

      {/* Scene 2: Features showcase */}
      <TransitionSeries.Sequence durationInFrames={FEATURES_DURATION}>
        <FeaturesScene features={features} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 3: Price & CTA */}
      <TransitionSeries.Sequence durationInFrames={PRICE_DURATION}>
        <PriceScene
          productName={productName}
          price={price}
          originalPrice={originalPrice}
          discount={discount}
          brandName={brandName}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 180 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />

      {/* Scene 4: Closing / Brand */}
      <TransitionSeries.Sequence durationInFrames={CLOSING_DURATION}>
        <ClosingScene brandName={brandName} productName={productName} socialLinks={socialLinks} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};