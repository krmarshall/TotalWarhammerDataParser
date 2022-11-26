const specialAbilityPhaseStatEffects_uiUnitStats = (specialAbilityPhaseStatEffects, uiUnitStats) => {
  const stapledTable = specialAbilityPhaseStatEffects.map((phaseStatEffect) => {
    const relatedUiUnitStat = uiUnitStats.find((stat) => {
      return stat.key === phaseStatEffect.stat;
    });
    if (relatedUiUnitStat !== undefined) {
      phaseStatEffect.sort_order = parseInt(relatedUiUnitStat.sort_order);
      phaseStatEffect.icon = `vanilla3/${relatedUiUnitStat.icon.replace(/^ui\//).replace('.png', '')}`;
      if (phaseStatEffect.icon === 'vanilla3/skins/default/placeholder') {
        phaseStatEffect.icon = statEffectIconEnum[phaseStatEffect.stat];
      }
    }
    return { ...phaseStatEffect };
  });
  return stapledTable;
};

export default specialAbilityPhaseStatEffects_uiUnitStats;

// Both base games have a bunch of stat effect icons that point to a placeholder image, just hardcoding them to somewhat relevant images
const statEffectIconEnum = {
  scalar_bracing: 'vanilla3/skins/default/icon_stat_bracing',
  scalar_charge_speed: 'vanilla3/skins/default/icon_stat_speed',
  scalar_entity_acceleration_modifier: 'vanilla3/skins/default/icon_stat_speed',
  scalar_entity_deceleration_modifier: 'vanilla3/skins/default/icon_stat_speed',
  scalar_miscast_chance: 'vanilla3/skins/default/icon_stat_miscast',
  scalar_missile_damage_ap: 'vanilla3/skins/default/modifier_icon_armour_piercing_ranged',
  scalar_missile_damage_base: 'vanilla3/skins/default/icon_stat_ranged_damage_base',
  scalar_missile_explosion_damage_ap: 'vanilla3/skins/default/icon_stat_explosive_armour_piercing_damage',
  scalar_missile_explosion_damage_base: 'vanilla3/skins/default/icon_explosive_damage',
  scalar_missile_range: 'vanilla3/skins/default/icon_stat_range',
  scalar_speed: 'vanilla3/skins/default/icon_stat_speed',
  scalar_spell_mastery: 'vanilla3/skins/default/modifier_icon_magical',
  scalar_splash_attack_power: 'vanilla3/skins/default/icon_stat_damage',
  stat_accuracy: 'vanilla3/skins/default/icon_stat_range',
  stat_ammo: 'vanilla3/skins/default/icon_stat_ammo',
  stat_armour: 'vanilla3/skins/default/icon_stat_armour',
  stat_bonus_vs_cavalry: 'vanilla3/skins/default/modifier_icon_bonus_vs_large',
  stat_bonus_vs_infantry: 'vanilla3/skins/default/modifier_icon_bonus_vs_infantry',
  stat_bonus_vs_large: 'vanilla3/skins/default/modifier_icon_bonus_vs_large',
  stat_charge_bonus: 'vanilla3/skins/default/icon_stat_charge_bonus',
  stat_damage_reflection: 'vanilla3/skins/default/icon_stat_damage_reflection',
  stat_health: 'vanilla3/skins/default/icon_stat_health',
  stat_mana: 'vanilla3/skins/default/modifier_icon_magical',
  stat_mass: 'vanilla3/skins/default/icon_stat_mass',
  stat_melee_attack: 'vanilla3/skins/default/icon_stat_attack',
  stat_melee_damage_ap: 'vanilla3/skins/default/modifier_icon_armour_piercing',
  stat_melee_damage_base: 'vanilla3/skins/default/icon_stat_damage_base',
  stat_melee_defence: 'vanilla3/skins/default/icon_stat_defence',
  stat_miscast_additional: 'vanilla3/skins/default/icon_stat_miscast',
  stat_missile_block_chance: 'vanilla3/skins/default/icon_stat_defence',
  stat_missile_damage: 'vanilla3/skins/default/icon_stat_ranged_damage_base',
  stat_missile_damage_over_time: 'vanilla3/skins/default/icon_stat_ranged_damage',
  stat_morale: 'vanilla3/skins/default/icon_stat_morale',
  stat_num_uses_additional: 'vanilla3/skins/default/modifier_icon_magical',
  stat_reloading: 'vanilla3/skins/default/icon_stat_reload_time',
  stat_resistance_all: 'vanilla3/skins/default/resistance_ward_save',
  stat_resistance_flame: 'vanilla3/skins/default/resistance_fire',
  stat_resistance_magic: 'vanilla3/skins/default/resistance_magic',
  stat_resistance_missile: 'vanilla3/skins/default/resistance_missile',
  stat_resistance_physical: 'vanilla3/skins/default/resistance_physical',
  stat_shield_armour: 'vanilla3/skins/default/icon_stat_defence',
  stat_shield_defence: 'vanilla3/skins/default/icon_stat_armour',
  stat_ship_health: 'vanilla3/skins/default/icon_stat_ship_health',
  stat_ship_move_speed: 'vanilla3/skins/default/icon_stat_speed',
  stat_spotting_forest: 'vanilla3/skins/default/icon_stat_spotting',
  stat_visibility_sight: 'vanilla3/skins/default/icon_stat_spotting',
  stat_weakness_flame: 'vanilla3/skins/default/modifier_icon_flaming',
  stat_weapon_damage: 'vanilla3/skins/default/icon_stat_damage',
};
