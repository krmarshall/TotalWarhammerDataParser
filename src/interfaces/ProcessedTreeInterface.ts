interface EffectInterface {
  description: string;
  effect: string;
  icon: string;
  is_positive_value_good: boolean;
  priority: number;
  scope?: string;
}

interface FactionEffectsInterface {
  effects: Array<EffectInterface>;
  key?: string;
  localised_description?: string;
  localised_title?: string;
  ui_icon?: string;
}

interface ItemInterface {
  key: string;
  effects: Array<EffectInterface>;
  onscreen_name: string;
  colour_text: string;
  unlocked_at_rank: number;
  instant: boolean;
  ui_icon: string;
}

interface ProcessedAgentInterface {
  key: string;
  factionEffects?: FactionEffectsInterface;
  items?: Array<ItemInterface>;
}

export { EffectInterface, FactionEffectsInterface, ItemInterface, ProcessedAgentInterface };
