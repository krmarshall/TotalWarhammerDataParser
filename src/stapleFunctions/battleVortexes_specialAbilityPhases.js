import { parseFloatToFixed } from '../otherFunctions/index.js';

const battleVortexesPrune = [
  'start_radius',
  'move_change_freq',
  'change_max_angle',
  'height_off_ground',
  'infinite_height',
  'composite_scene',
  'detonation_force',
  'launch_source',
  'building_collision',
  'launch_vfx',
  'composite_scene_blood',
  'launch_source_offset',
  'composite_scene_group',
  'is_spell',
  'shape',
  'start_height',
  'goal_height',
  'expansion_speed',
];

const battleVortexes_specialAbilityPhases = (battleVortexes, specialAbilityPhases) => {
  const stapledTable = battleVortexes.map((vortex) => {
    battleVortexesPrune.forEach((prune) => delete vortex[prune]);

    vortex.duration = parseInt(vortex.duration);
    vortex.damage = parseInt(vortex.damage);
    vortex.damage_ap = parseInt(vortex.damage_ap);
    vortex.goal_radius = parseFloatToFixed(vortex.goal_radius);
    vortex.movement_speed = parseFloatToFixed(vortex.movement_speed);
    vortex.is_magical = JSON.parse(vortex.is_magical);
    vortex.is_flaming = vortex.ignition_amount >= 1 ? true : false;
    delete vortex.ignition_amount;
    vortex.delay = parseFloatToFixed(vortex.delay);
    vortex.num_vortexes = parseInt(vortex.num_vortexes);
    vortex.num_vortexes > 1 ? undefined : delete vortex.num_vortexes;
    vortex.delay_between_vortexes = parseFloatToFixed(vortex.delay_between_vortexes);
    vortex.num_vortexes > 1 ? undefined : delete vortex.delay_between_vortexes;
    vortex.affects_allies = JSON.parse(vortex.affects_allies);

    ['vacuum', 'is_magical', 'is_flaming'].forEach((key) => {
      if (!vortex[key]) {
        delete vortex[key];
      }
    });

    if (vortex.contact_effect) {
      const relatedContactEffect = specialAbilityPhases.find((phase) => phase.id === vortex.contact_effect);
      if (relatedContactEffect !== undefined) {
        vortex.contact_effect = relatedContactEffect;
      }
    } else {
      delete vortex.contact_effect;
    }

    return { ...vortex };
  });

  return stapledTable;
};

export default battleVortexes_specialAbilityPhases;
