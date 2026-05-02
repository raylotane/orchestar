import z from "zod";

// Constants
export const PRODUCT_TRAILER_DURATION_IN_FRAMES = 360; // 12s @ 30fps
export const PRODUCT_TRAILER_COMP_NAME = "ProductTrailer";

export type ProductTrailerPropsType = z.infer<typeof ProductTrailerProps>;

// Props schema for the product trailer template
export const ProductTrailerProps = z.object({
  productName: z.string().default("Orchestar"),
  sloganEn: z.string().default("Your vision, orchestrated."),
  sloganCn: z.string().default("你说需求，AI 排布"),
  tagline: z.string().default("AI 视频编排平台，说人话就能出片"),
  painPoint: z.string().default("找设计等排期"),
  painPointSub: z.string().default("几天？一周？"),
  solution: z.string().default("AI 秒出"),
  solutionSub: z.string().default("一句话的功夫"),
  features: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string().optional(),
    })
  ).default([
    { icon: "✨", title: "智能编排", desc: "AI 自动理解并编排视频内容" },
    { icon: "📐", title: "模板丰富", desc: "海量模板，一键替换" },
    { icon: "🎬", title: "一键导出", desc: "多格式支持，高清输出" },
  ]),
  ctaText: z.string().default("开始创作"),
  ctaSubText: z.string().default("免费体验，无需注册"),
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