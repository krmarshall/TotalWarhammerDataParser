import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { AbilityInterface, PhaseInterface } from '../interfaces/ProcessedTreeInterface';
import findImage from '../utils/findImage';
import { parseBoolean, parseFloating, parseInteger } from '../utils/parseStringToTypes';
import processPhase from './processPhase';
import processVortex from './processVortex';

const processAbility = (folder: string, globalData: GlobalDataInterface, abilityJunc: TableRecord) => {
  const unitAbility = abilityJunc.localRefs?.unit_abilities as TableRecord;
  const unitAbilityType = unitAbility.localRefs?.unit_ability_types as TableRecord;
  const unitSpecialAbility = unitAbility.foreignRefs?.unit_special_abilities[0] as TableRecord;

  const ability: AbilityInterface = {
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
    if ((ability.unit_ability[field as keyof typeof ability.unit_ability] as number) <= 0) {
      delete ability.unit_ability[field as keyof typeof ability.unit_ability];
    }
  });

  const phases: Array<PhaseInterface> = [];
  // phases
  unitSpecialAbility.foreignRefs?.special_ability_to_special_ability_phase_junction?.forEach((phaseJunc) => {
    phases.push(processPhase(folder, globalData, phaseJunc, phaseJunc.localRefs?.special_ability_phases as TableRecord));
  });
  if (phases.length > 0) ability.unit_ability.phases = phases;
  // activated_projectile
  // To Do

  // bombardment
  // To Do

  // vortex
  if (unitSpecialAbility.localRefs?.battle_vortexs !== undefined) {
    ability.unit_ability.vortex = processVortex(unitSpecialAbility.localRefs?.battle_vortexs);
  }

  return ability;
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
