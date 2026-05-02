import { SceneDefinition } from "@/app/types/constants";
import z from "zod";

export interface SceneMeta {
  durationInFrames: number;
  fps?: number;
  width?: number;
  height?: number;
}

/**
 * 应用某个场景 - 根据场景ID初始化场景信息
 * @param sceneId 场景ID
 * @returns 场景完整信息（sceneId, sceneProps, sceneMeta），如果场景不存在返回null
 */
export function applyScene(sceneId: string): z.infer<typeof SceneDefinition> | null {
  const scene = sceneRegistry.get(sceneId);
  if (!scene) {
    console.error(`[applyScene] 场景未找到: ${sceneId}`);
    return null;
  }

  // 使用场景的默认属性初始化
  const sceneProps = scene.sceneDefaultProps ?? {};

  return {
    sceneId: scene.sceneId,
    sceneName: scene.sceneName,
    sceneDescription: scene.sceneDescription,
    sceneProps,
    sceneMeta: scene.sceneMeta,
  };
}

class SceneRegistry {
  private _scenes = new Map<string, z.infer<typeof SceneDefinition>>();

  /**
   * @param def 场景定义
   * @returns 
   */
  register(def: z.infer<typeof SceneDefinition>): this {
    this._scenes.set(def.sceneId, def);
    return this;
  }

  /**
   * 
   * @param id 场景ID
   * @returns 
   */
  get(id: string): z.infer<typeof SceneDefinition> | undefined {
    return this._scenes.get(id);
  }

  /** List all registered scenes */
  list(): z.infer<typeof SceneDefinition>[] {
    return Array.from(this._scenes.values());
  }

  /**
   * Generate a system prompt snippet listing available video templates.
   * Inject this into AI agent instructions so it knows what scenes exist.
   */
  toSystemPrompt(): string {
    const scenes = this.list();
    if (scenes.length === 0) return "";

    let prompt = `## Available Video Templates\n\n`;
    prompt += `You can help users generate video content using these templates:\n\n`;

    for (const s of scenes) {
      prompt += `### ${s.sceneName} (\`${s.sceneId}\`)\n`;
      prompt += `${s.sceneDescription}\n`;
      // prompt += `- Duration: ${s.meta.durationInFrames} frames @ ${s.meta.fps ?? 30}fps (~${((s.meta.durationInFrames / (s.meta.fps ?? 30))).toFixed(1)}s)\n`;
      // if (s.meta.width && s.meta.height) {
      //   prompt += `- Resolution: ${s.meta.width}x${s.meta.height}\n`;
      // }
      prompt += "\n";
    }

    return prompt;
  }
}

export const sceneRegistry = new SceneRegistry();

