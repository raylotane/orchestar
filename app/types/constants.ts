import { z } from "zod";
export const COMP_NAME = "MyComp";
import { defaultCoffeeBrandProps, COFFEE_COMP_NAME, COFFEE_DURATION_IN_FRAMES } from "@/app/remotion/CoffeeBrand/types"

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Next.js and Remotion",
};

export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

export const initScene = {
  id: COFFEE_COMP_NAME,
  props: defaultCoffeeBrandProps,
  meta: {
    durationInFrames: COFFEE_DURATION_IN_FRAMES,
    fps: 30,
    width: 1280,
    height: 720,
  },
}