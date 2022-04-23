import { basename } from 'path';

const specialAbilityPhaseStatEffects_uiUnitStats = (specialAbilityPhaseStatEffects, uiUnitStats) => {
  const stapledTable = specialAbilityPhaseStatEffects.map((phaseStatEffect) => {
    const relatedUiUnitStat = uiUnitStats.find((stat) => {
      return stat.key === phaseStatEffect.stat;
    });
    if (relatedUiUnitStat !== undefined) {
      phaseStatEffect.sort_order = parseInt(relatedUiUnitStat.sort_order);
      phaseStatEffect.icon = basename(relatedUiUnitStat.icon);
      if (phaseStatEffect.icon === 'placeholder.png') {
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
  scalar_bracing: 'icon_stat_bracing.png',
  scalar_charge_speed: 'icon_stat_speed.png',
  scalar_entity_acceleration_modifier: 'icon_stat_speed.png',
  scalar_entity_deceleration_modifier: 'icon_stat_speed.png',
  scalar_miscast_chance: 'icon_stat_miscast.png',
  scalar_missile_damage_ap: 'modifier_icon_armour_piercing_ranged.png',
  scalar_missile_damage_base: 'icon_stat_ranged_damage_base.png',
  scalar_missile_explosion_damage_ap: 'icon_stat_explosive_armour_piercing_damage.png',
  scalar_missile_explosion_damage_base: 'icon_explosive_damage.png',
  scalar_missile_range: 'icon_stat_range.png',
  scalar_speed: 'icon_stat_speed.png',
  scalar_spell_mastery: 'modifier_icon_magical.webp',
  scalar_splash_attack_power: 'icon_stat_damage.png',
  stat_accuracy: 'icon_stat_range.png',
  stat_ammo: 'icon_stat_ammo.png',
  stat_armour: 'icon_stat_armour.png',
  stat_bonus_vs_cavalry: 'modifier_icon_bonus_vs_large.png',
  stat_bonus_vs_infantry: 'modifier_icon_bonus_vs_infantry.png',
  stat_bonus_vs_large: 'modifier_icon_bonus_vs_large.png',
  stat_charge_bonus: 'icon_stat_charge_bonus.png',
  stat_damage_reflection: 'icon_stat_damage_reflection.png',
  stat_health: 'icon_stat_health.png',
  stat_mana: 'modifier_icon_magical.webp',
  stat_mass: 'icon_stat_mass.png',
  stat_melee_attack: 'icon_stat_attack.png',
  stat_melee_damage_ap: 'modifier_icon_armour_piercing.png',
  stat_melee_damage_base: 'icon_stat_damage_base.png',
  stat_melee_defence: 'icon_stat_defence.png',
  stat_miscast_additional: 'icon_stat_miscast.png',
  stat_missile_block_chance: 'icon_stat_defence.png',
  stat_missile_damage: 'icon_stat_ranged_damage_base.png',
  stat_missile_damage_over_time: 'icon_stat_ranged_damage.png',
  stat_morale: 'icon_stat_morale.png',
  stat_num_uses_additional: 'modifier_icon_magical.webp',
  stat_reloading: 'icon_stat_reload_time.png',
  stat_resistance_all: 'resistance_ward_save.png',
  stat_resistance_flame: 'resistance_fire.png',
  stat_resistance_magic: 'resistance_magic.png',
  stat_resistance_missile: 'resistance_missile.png',
  stat_resistance_physical: 'resistance_physical.png',
  stat_shield_armour: 'icon_stat_defence.png',
  stat_shield_defence: 'icon_stat_armour.png',
  stat_ship_health: 'icon_stat_ship_health.png',
  stat_ship_move_speed: 'icon_stat_speed.png',
  stat_spotting_forest: 'icon_stat_spotting.png',
  stat_visibility_sight: 'icon_stat_spotting.png',
  stat_weakness_flame: 'modifier_icon_flaming.png',
  stat_weapon_damage: 'icon_stat_damage.png',
};
