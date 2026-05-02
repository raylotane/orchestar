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


export const SceneDefinition = z.object({
  sceneId: z.string(),
  sceneName: z.string().optional(),
  sceneDescription: z.string().optional(),
  sceneProps: z.any(),
  sceneDefaultProps: z.any().optional(),
  sceneMeta: z.object({
    durationInFrames: z.number(),
    fps: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
})
