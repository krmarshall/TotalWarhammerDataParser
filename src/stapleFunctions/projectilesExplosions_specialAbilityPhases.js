import { parseFloatToFixed } from '../otherFunctions/index.js';

const projectilesExplosionsPrune = [
  'detonator_type',
  'detonation_type',
  'detonation_duration',
  'detonation_speed',
  'shrapnel',
  'explosion_particle_effect',
  'fuse_distance_from_target',
  'explosion_particle_effect_on_ground',
  'explosion_audio',
  'camera_shake',
  'detonation_force',
  'fuse_fixed_time',
  'is_spell',
];

const projectilesExplosions_specialAbilityPhases = (projectilesExplosions, specialAbilityPhases) => {
  const stapledTable = projectilesExplosions.map((explosion) => {
    projectilesExplosionsPrune.forEach((prune) => delete explosion[prune]);

    explosion.detonation_radius = parseFloatToFixed(explosion.detonation_radius);
    explosion.detonation_damage = parseInt(explosion.detonation_damage);
    explosion.detonation_damage_ap = parseInt(explosion.detonation_damage_ap);
    explosion.is_magical = JSON.parse(explosion.is_magical);
    explosion.is_flaming = explosion.ignition_amount >= 1 ? true : false;
    delete explosion.ignition_amount;
    explosion.affects_allies = JSON.parse(explosion.affects_allies);

    explosion.is_magical === true ? undefined : delete explosion.is_magical;
    explosion.is_flaming === true ? undefined : delete explosion.is_flaming;

    if (explosion.contact_phase_effect) {
      const relatedContactEffect = specialAbilityPhases.find((phase) => phase.id === explosion.contact_phase_effect);
      if (relatedContactEffect !== undefined) {
        explosion.contact_phase_effect = relatedContactEffect;
      }
    } else {
      delete explosion.contact_phase_effect;
    }

    return { ...explosion };
  });
  return stapledTable;
};

export default projectilesExplosions_specialAbilityPhases;
