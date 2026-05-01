import { z } from "zod";

// ===== Coffee Brand Video Config =====
export const COFFEE_COMP_NAME = "CoffeeBrandVideo";

export const CoffeeBrandProps = z.object({
  brandName: z.string(),
  tagline: z.string(),
  features: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    desc: z.string(),
  })),
  socialPlatform: z.string().optional().describe("社交平台")
});

export const CoffeeBrandSceneProps = z.object({
  name: z.string().describe("场景名称"),
  description: z.string().describe("场景描述"),
  props: CoffeeBrandProps.describe("场景属性")
});

console.log("CoffeeBrandSceneProps", CoffeeBrandSceneProps)

export const defaultCoffeeBrandProps: z.infer<typeof CoffeeBrandProps> = {
  brandName: "AROMISTA",
  tagline: "每一杯，都是艺术品",
  features: [{
    icon: "bean",
    title: "精选豆源",
    desc: "源自埃塞俄比亚 & 哥伦比亚\n单一产区·精品级生豆",
  },
  {
    icon: "fire",
    title: "手工烘焙",
    desc: "大师烘焙师·精准温控\n每一批·匠心独运",
  },
  {
    icon: "leaf",
    title: "馥郁香气",
    desc: "坚果·焦糖·果酸层次丰富\n余韵悠长·回味无穷",
  }],
  socialPlatform: "www.aromista.com"
};

export const COFFEE_DURATION_IN_FRAMES = 450; // 15 seconds @ 30fps