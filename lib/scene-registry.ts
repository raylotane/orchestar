import { ZodObject } from "zod";

export interface SceneMeta {
  durationInFrames: number;
  fps?: number;
  width?: number;
  height?: number;
}

export interface ISceneDefinition<TProps = Record<string, unknown>> {
  id: string;
  name: string;
  description: string;
  propsSchema: ZodObject<any>;
  defaultProps: TProps;
  meta: SceneMeta;
}

class SceneRegistry {
  private _scenes = new Map<string, ISceneDefinition>();

  /**
   * @param def 场景定义
   * @returns 
   */
  register(def: ISceneDefinition<Record<string, unknown>>): this {
    this._scenes.set(def.id, def);
    return this;
  }

  /**
   * 
   * @param id 场景ID
   * @returns 
   */
  get(id: string): ISceneDefinition | undefined {
    return this._scenes.get(id);
  }

  /** List all registered scenes */
  list(): ISceneDefinition[] {
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
      prompt += `### ${s.name} (\`${s.id}\`)\n`;
      prompt += `${s.description}\n`;
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

