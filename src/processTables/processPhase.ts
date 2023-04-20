import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { PhaseInterface, StatEffectInterface } from '../interfaces/ProcessedTreeInterface';
import numberPrepend from '../utils/numberPrepend';
import { parseBoolean, parseFloating, parseInteger } from '../utils/parseStringToTypes';
import stringInterpolator from '../utils/stringInterpolator';

const processPhase = (folder: string, globalData: GlobalDataInterface, phaseJunc: TableRecord, phase: TableRecord) => {
  const returnPhase: PhaseInterface = {
    order: parseInteger(phaseJunc.order),
    target_enemies: parseBoolean(phaseJunc.target_enemies),
    target_self: parseBoolean(phaseJunc.target_self),
    target_friends: parseBoolean(phaseJunc.target_friends),
    duration: parseInteger(phase.duration),
    effect_type: phase.effect_type,
    onscreen_name: stringInterpolator(phase.onscreen_name, globalData.parsedData[folder].text),
    is_hidden_in_ui: parseBoolean(phase.is_hidden_in_ui),
    ability_recharge_change: parseFloating(phase.ability_recharge_change),
    barrier_heal_amount: parseFloating(phase.barrier_heal_amount),
    cant_move: parseBoolean(phase.cant_move),
    damage_amount: parseFloating(phase.damage_amount),
    fatigue_change_ratio: parseFloating(phase.fatigue_change_ratio),
    heal_amount: parseFloating(phase.heal_amount),
    hp_change_frequency: parseFloating(phase.hp_change_frequency),
    imbue_magical: parseBoolean(phase.imbue_magical),
    mana_max_depletion_mod: parseFloating(phase.mana_max_depletion_mod),
    mana_regen_mod: parseFloating(phase.mana_regen_mod),
    max_damaged_entities: parseInteger(phase.max_damaged_entities),
    remove_magical: parseBoolean(phase.remove_magical),
    replenish_ammo: parseFloating(phase.replenish_ammo),
    resurrect: parseBoolean(phase.resurrect),
    unbreakable: parseBoolean(phase.unbreakable),
  };

  [
    'onscreen_name',
    'ability_recharge_change',
    'barrier_heal_amount',
    'cant_move',
    'damage_amount',
    'fatigue_change_ratio',
    'heal_amount',
    'hp_change_frequency',
    'imbue_magical',
    'mana_max_depletion_mod',
    'mana_regen_mod',
    'max_damaged_entities',
    'remove_magical',
    'replenish_ammo',
    'resurrect',
    'unbreakable',
  ].forEach((field) => {
    const phaseField = returnPhase[field as keyof typeof returnPhase];
    if (typeof phaseField === 'boolean' && phaseField === false) {
      delete returnPhase[field as keyof typeof returnPhase];
    } else if (typeof phaseField === 'number' && phaseField <= 0) {
      delete returnPhase[field as keyof typeof returnPhase];
    } else if (typeof phaseField === 'string' && phaseField === '') {
      delete returnPhase[field as keyof typeof returnPhase];
    }
  });

  // imbue_contact
  if (phase.localRefs?.special_ability_phases !== undefined) {
    returnPhase.imbue_contact = processPhase(
      folder,
      globalData,
      { order: '1', target_enemies: 'true', target_self: 'false', target_friends: 'false' },
      phase.localRefs?.special_ability_phases as TableRecord
    );
  }
  // imbue_ignition
  if (parseInteger(phase.imbue_ignition) >= 1) returnPhase.imbue_ignition = true;
  // spreading
  if (phase.localRefs?.special_ability_spreadings !== undefined) {
    returnPhase.spread_radius = parseInteger(phase.localRefs?.special_ability_spreadings.spread_radius);
  }
  // stat_effects
  const statEffects: Array<StatEffectInterface> = [];
  phase.foreignRefs?.special_ability_phase_stat_effects?.forEach((phaseStat) => {
    const statLoc = phaseStat.localRefs?.modifiable_unit_stats?.localRefs?.unit_stat_localisations as TableRecord;
    const uiUnitStat = statLoc.foreignRefs?.ui_unit_stats[0] as TableRecord;
    statEffects.push({
      value: parseFloating(phaseStat.value),
      stat: phaseStat.stat,
      how: phaseStat.how,
      description: numberPrepend(
        stringInterpolator(statLoc.onscreen_name, globalData.parsedData[folder].text),
        parseFloating(phaseStat.value),
        phaseStat.how
      ),
      icon: 'vanilla3/' + uiUnitStat.icon.replace(/^ui\//, '').replace('.png', '').replace(' ', '_').toLowerCase(),
      sort_order: parseInteger(uiUnitStat.sort_order as string),
    });
  });
  // attributes
  if (phase.foreignRefs?.special_ability_phase_attribute_effects !== undefined) {
    let breakpoint;
    // To Do
  }

  return returnPhase;
};

export default processPhase;
