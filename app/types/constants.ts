import { z } from "zod";
export const COMP_NAME = "MyComp";

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

// ===== Coffee Brand Video Config =====
export const COFFEE_COMP_NAME = "CoffeeBrandVideo";

export const CoffeeBrandProps = z.object({
  brandName: z.string(),
  tagline: z.string(),
});

export const defaultCoffeeBrandProps: z.infer<typeof CoffeeBrandProps> = {
  brandName: "AROMISTA",
  tagline: "每一杯，都是艺术品",
};

export const COFFEE_DURATION_IN_FRAMES = 450; // 15 seconds @ 30fps
