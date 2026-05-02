import { Composition } from "remotion";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";
import {
  CoffeeBrandVideo,
  COFFEE_COMP_NAME,
  COFFEE_DURATION_IN_FRAMES,
  defaultCoffeeBrandProps,
} from "./CoffeeBrand";
import {
  EcommerceShowcase,
  ECOMMERCE_COMP_NAME,
  ECOMMERCE_DURATION_IN_FRAMES,
  defaultEcommerceShowcaseProps,
} from "./EcommerceShowcase";
import {
  OrchestarIntroVideo,
  ORCHESTAR_COMP_NAME,
  ORCHESTAR_DURATION_IN_FRAMES,
  defaultOrchestarIntroProps,
} from "./OrchestarIntro";
import {
  ProductTrailer,
} from "./ProductTrailer";
import { defaultProductTrailerProps, PRODUCT_TRAILER_COMP_NAME, PRODUCT_TRAILER_DURATION_IN_FRAMES } from "./ProductTrailer/types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
      {/* Coffee Brand Promotional Video */}
      <Composition
        id={COFFEE_COMP_NAME}
        component={CoffeeBrandVideo}
        durationInFrames={COFFEE_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultCoffeeBrandProps}
      />
      {/* E-commerce Product Showcase */}
      <Composition
        id={ECOMMERCE_COMP_NAME}
        component={EcommerceShowcase}
        durationInFrames={ECOMMERCE_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultEcommerceShowcaseProps}
      />
      {/* Orchestar Product Introduction */}
      <Composition
        id={ORCHESTAR_COMP_NAME}
        component={OrchestarIntroVideo}
        durationInFrames={ORCHESTAR_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultOrchestarIntroProps}
      />
      {/* Product Trailer - Scene Templates Showcase */}
      <Composition
        id={PRODUCT_TRAILER_COMP_NAME}
        component={ProductTrailer}
        durationInFrames={PRODUCT_TRAILER_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultProductTrailerProps}
      />
    </>
  );
};
