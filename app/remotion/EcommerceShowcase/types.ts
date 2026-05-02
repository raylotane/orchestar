import { SceneDefinition } from "@/app/types/constants";
import { z } from "zod";

export const EcommerceShowcaseProps = z.object({
  productName: z.string(),
  productCategory: z.string(),
  price: z.string(),
  originalPrice: z.string(),
  description: z.string(),
  features: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
  brandName: z.string(),
  discount: z.string(),
  socialLinks: z.array(z.string()).optional().describe("社交平台链接"),
});

export type EcommerceShowcaseProps = z.infer<typeof EcommerceShowcaseProps>;

export const ECOMMERCE_COMP_NAME = "EcommerceShowcase";
export const ECOMMERCE_DURATION_IN_FRAMES = 480; // 16 seconds @ 30fps

export const defaultEcommerceShowcaseProps: EcommerceShowcaseProps = {
  productName: "无线降噪耳机",
  productCategory: "数码配件",
  price: "¥599",
  originalPrice: "¥899",
  description: "沉浸式音质，智能降噪，40小时超长续航",
  features: [
    {
      icon: "🎧",
      title: "主动降噪",
      description: "智能环境音识别",
    },
    {
      icon: "🔋",
      title: "40小时续航",
      description: "一次充电，全天无忧",
    },
    {
      icon: "💎",
      title: "Hi-Fi音质",
      description: "40mm定制动圈单元",
    },
    {
      icon: "📱",
      title: "蓝牙5.3",
      description: "稳定连接，无缝切换",
    },
  ],
  brandName: "SoundMax",
  discount: "限时特惠",
  socialLinks: ["Weibo", "WeChat", "JD.com"],
};

// ===== Register to global scene registry =====
export const ecommerceSceneDef: z.infer<typeof SceneDefinition> = {
  sceneId: ECOMMERCE_COMP_NAME,
  sceneName: "E-commerce Product Showcase",
  sceneDescription:
    "电商商品展示视频模板，包含产品封面、特色介绍、价格展示、结尾CTA等分镜。适用于数码产品、服装鞋帽、美妆护肤等电商场景。",
  sceneProps: EcommerceShowcaseProps,
  sceneDefaultProps: defaultEcommerceShowcaseProps,
  sceneMeta: {
    durationInFrames: ECOMMERCE_DURATION_IN_FRAMES,
    fps: 30,
    width: 1280,
    height: 720,
  },
};