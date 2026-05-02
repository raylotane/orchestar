import { SceneDefinition } from "@/app/types/constants";
import z from "zod";

// Constants
export const PRODUCT_TRAILER_DURATION_IN_FRAMES = 360; // 12s @ 30fps
export const PRODUCT_TRAILER_COMP_NAME = "ProductTrailer";

export type ProductTrailerPropsType = z.infer<typeof ProductTrailerProps>;

// Props schema for the product trailer template
export const ProductTrailerProps = z.object({
  productName: z.string(),
  sloganEn: z.string(),
  sloganCn: z.string(),
  tagline: z.string(),
  painPoint: z.string(),
  painPointSub: z.string(),
  solution: z.string(),
  solutionSub: z.string(),
  features: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string().optional(),
    })
  ),
  ctaText: z.string(),
  ctaSubText: z.string(),
});

// Default props for quick preview
export const defaultProductTrailerProps: ProductTrailerPropsType = {
  productName: "Orchestar·灵阵",
  sloganEn: "Your vision, orchestrated.",
  sloganCn: "你说需求，AI 排布",
  tagline: "AI 视频编排平台，说人话就能出片",
  painPoint: "找设计等排期",
  painPointSub: "几天？一周？",
  solution: "AI 秒出",
  solutionSub: "一句话的功夫",
  features: [
    { icon: "✨", title: "智能编排", desc: "AI 自动理解并编排视频内容" },
    { icon: "📐", title: "模板丰富", desc: "海量模板，一键替换" },
    { icon: "🎬", title: "一键导出", desc: "多格式支持，高清输出" },
  ],
  ctaText: "开始创作",
  ctaSubText: "免费体验，无需注册",
};

// ===== Register to global scene registry =====
export const productTrailerSceneDef: z.infer<typeof SceneDefinition> = {
  sceneId: PRODUCT_TRAILER_COMP_NAME,
  sceneName: "产品预告片",
  sceneDescription:
    "AI 产品预告片模板，叙事流程：开场口号 → 产品介绍 → 痛点对比 → 核心卖点 → CTA 引导。适用于 SaaS 产品、智能硬件、应用服务等宣发场景。5 个场景模块可独立组合复用。",
  sceneProps: ProductTrailerProps,
  sceneDefaultProps: defaultProductTrailerProps,
  sceneMeta: {
    durationInFrames: PRODUCT_TRAILER_DURATION_IN_FRAMES,
    fps: 30,
    width: 1280,
    height: 720,
  },
};