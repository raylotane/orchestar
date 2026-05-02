import { z } from "zod";
import { SceneDefinition } from "@/app/types/constants";

export const ORCHESTAR_COMP_NAME = "OrchestarIntro";

export const OrchestarIntroProps = z.object({
  productName: z.string().default("Orchestar · 灵阵"),
  sloganEn: z.string().default("Your vision, orchestrated."),
  sloganCn: z.string().default("你说需求，AI 排布"),
  website: z.string().default("www.orchestar.com"),
});

export const defaultOrchestarIntroProps: z.infer<typeof OrchestarIntroProps> = {
  productName: "Orchestar · 灵阵",
  sloganEn: "Your vision, orchestrated.",
  sloganCn: "你说需求，AI 排布",
  website: "www.orchestar.com",
};

export const ORCHESTAR_DURATION_IN_FRAMES = 450; // 15s @ 30fps

export const orchestarSceneDef: z.infer<typeof SceneDefinition> = {
  sceneId: ORCHESTAR_COMP_NAME,
  sceneName: "Orchestar 产品介绍",
  sceneDescription:
    "Orchestar 产品介绍视频模板，Meta Showcase 风格，展示从需求到视频的完整流程。15 秒快节奏演示。",
  sceneProps: OrchestarIntroProps,
  sceneDefaultProps: defaultOrchestarIntroProps,
  sceneMeta: {
    durationInFrames: ORCHESTAR_DURATION_IN_FRAMES,
    fps: 30,
    width: 1280,
    height: 720,
  },
};