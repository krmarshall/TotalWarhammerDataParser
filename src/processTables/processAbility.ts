import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { AbilityInterface, PhaseInterface } from '../interfaces/ProcessedTreeInterface';
import findImage from '../utils/findImage';
import { parseBoolean, parseFloating, parseInteger } from '../utils/parseStringToTypes';
import stringInterpolator from '../utils/stringInterpolator';
import processBombardment from './processBombardment';
import processPhase from './processPhase';
import processProjectile from './processProjectile';
import processVortex from './processVortex';

const processAbility = (folder: string, globalData: GlobalDataInterface, abilityJunc: TableRecord) => {
  const unitAbility =
    (abilityJunc.localRefs?.unit_abilities as TableRecord) ??
    (abilityJunc.localRefs?.unit_set_unit_ability_junctions?.localRefs?.unit_abilities as TableRecord) ??
    (abilityJunc.localRefs?.army_special_abilities?.localRefs?.unit_special_abilities?.localRefs?.unit_abilities as TableRecord);
  const unitAbilityType = unitAbility.localRefs?.unit_ability_types as TableRecord;
  const unitSpecialAbility = unitAbility.foreignRefs?.unit_special_abilities[0] as TableRecord;

  const returnAbility: AbilityInterface = {
    effect: abilityJunc.effect,
    bonus_value_id: abilityJunc.bonus_value_id,
    unit_ability: {
      key: unitAbility.key,
      icon_name: findAbilityImage(folder, globalData, unitAbility.icon_name),
      overpower_option: unitAbility.overpower_option,
      type: {
        key: unitAbilityType.key,
        icon_path: findAbilityTypeImage(folder, globalData, unitAbilityType.icon_path),
        localised_description: unitAbilityType.localised_description,
      },
      is_hidden_in_ui: parseBoolean(unitAbility.is_hidden_in_ui),
      onscreen_name: unitAbility.onscreen_name,
      active_time: parseFloating(unitSpecialAbility.active_time),
      effect_range: parseFloating(unitSpecialAbility.effect_range),
      mana_cost: parseInteger(unitSpecialAbility.mana_cost),
      min_range: parseFloating(unitSpecialAbility.min_range),
      miscast_chance: parseFloating(unitSpecialAbility.miscast_chance),
      num_effected_enemy_units: parseInteger(unitSpecialAbility.num_effected_enemy_units),
      num_effected_friendly_units: parseInteger(unitSpecialAbility.num_effected_friendly_units),
      num_uses: parseInteger(unitSpecialAbility.num_uses),
      recharge_time: parseFloating(unitSpecialAbility.recharge_time),
      shared_recharge_time: parseFloating(unitSpecialAbility.shared_recharge_time),
      target_enemies: parseBoolean(unitSpecialAbility.target_enemies),
      target_friends: parseBoolean(unitSpecialAbility.target_friends),
      target_ground: parseBoolean(unitSpecialAbility.target_ground),
      target_self: parseBoolean(unitSpecialAbility.target_self),
      target_intercept_range: parseFloating(unitSpecialAbility.target_intercept_range),
      wind_up_time: parseFloating(unitSpecialAbility.wind_up_time),
    },
  };
  [
    'active_time',
    'mana_cost',
    'min_range',
    'miscast_chance',
    'num_effected_enemy_units',
    'num_effected_friendly_units',
    'num_uses',
    'recharge_time',
    'shared_recharge_time',
    'wind_up_time',
  ].forEach((field) => {
    if ((returnAbility.unit_ability[field as keyof typeof returnAbility.unit_ability] as number) <= 0) {
      delete returnAbility.unit_ability[field as keyof typeof returnAbility.unit_ability];
    }
  });

  // enabled_if
  unitSpecialAbility.foreignRefs?.special_ability_to_auto_deactivate_flags?.forEach((enable) => {
    if (returnAbility.unit_ability.enabled_if === undefined) returnAbility.unit_ability.enabled_if = [];
    returnAbility.unit_ability.enabled_if.push(
      stringInterpolator(
        enable.localRefs?.special_ability_invalid_usage_flags?.alt_description as string,
        globalData.parsedData[folder].text
      )
    );
  });

  // target_if
  unitSpecialAbility.foreignRefs?.special_ability_to_invalid_target_flags?.forEach((target) => {
    if (returnAbility.unit_ability.target_if === undefined) returnAbility.unit_ability.target_if = [];
    returnAbility.unit_ability.target_if.push(
      stringInterpolator(
        target.localRefs?.special_ability_invalid_usage_flags?.alt_description as string,
        globalData.parsedData[folder].text
      )
    );
  });

  // ui_effects
  unitAbility.foreignRefs?.unit_abilities_to_additional_ui_effects_juncs?.forEach((uiEffectJunc) => {
    if (returnAbility.unit_ability.ui_effects === undefined) returnAbility.unit_ability.ui_effects = [];
    const uiEffect = uiEffectJunc.localRefs?.unit_abilities_additional_ui_effects as TableRecord;
    returnAbility.unit_ability.ui_effects?.push({
      key: uiEffect.key,
      sort_order: parseInteger(uiEffect.sort_order),
      localised_text: stringInterpolator(uiEffect.localised_text, globalData.parsedData[folder].text),
    });
  });

  const phases: Array<PhaseInterface> = [];
  // phases
  unitSpecialAbility.foreignRefs?.special_ability_to_special_ability_phase_junction?.forEach((phaseJunc) => {
    phases.push(processPhase(folder, globalData, phaseJunc, phaseJunc.localRefs?.special_ability_phases as TableRecord));
  });
  if (phases.length > 0) returnAbility.unit_ability.phases = phases;

  // activated_projectile
  if (unitSpecialAbility.localRefs?.projectiles !== undefined) {
    returnAbility.unit_ability.activated_projectile = processProjectile(folder, globalData, unitSpecialAbility.localRefs?.projectiles);
  }

  // bombardment
  if (unitSpecialAbility.localRefs?.projectile_bombardments !== undefined) {
    returnAbility.unit_ability.bombardment = processBombardment(folder, globalData, unitSpecialAbility.localRefs?.projectile_bombardments);
  }

  // vortex
  const battleVortex = unitSpecialAbility.localRefs?.battle_vortexs;
  if (battleVortex !== undefined && battleVortex.damage !== '0' && battleVortex.damage_ap !== '0' && battleVortex.contact_effect !== '') {
    returnAbility.unit_ability.vortex = processVortex(folder, globalData, battleVortex);
  }

  return returnAbility;
};

export default processAbility;

const findAbilityImage = (folder: string, globalData: GlobalDataInterface, icon_name: string) => {
  const icon = icon_name.replace('.png', '').trim();
  const searchArray = [
    `battle_ui/ability_icons/${icon}`,
    `battle_ui/ability_icons/${icon.toLowerCase()}`,
    // WH2 has most of the ability icons in campaign_ui
    `campaign_ui/skills/${icon}`,
    `campaign_ui/skills/${icon.toLowerCase()}`,
    // SFO2 some ability icons have _active in the icon_name, but not actual image name
    `campaign_ui/skills/${icon.replace('_active', '')}`,
    `campaign_ui/skills/${icon.replace('_active', '').toLowerCase()}`,
  ];

  return findImage(folder, globalData, searchArray, icon);
};

const findAbilityTypeImage = (folder: string, globalData: GlobalDataInterface, icon_path: string) => {
  const vanillaGame = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const icon = icon_path.replace('.png', '').trim().replace(' ', '_').replace(/^ui\//, '');

  const modIcon = globalData.imgPaths[folder][icon];
  if (modIcon !== undefined) {
    return `${folder}/${modIcon}`;
  }

  const vanillaIcon = globalData.imgPaths[vanillaGame][icon];
  if (vanillaIcon !== undefined) {
    return `${vanillaGame}/${vanillaIcon}`;
  }

  return icon;
};
