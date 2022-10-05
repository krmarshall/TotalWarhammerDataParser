import { parseFloatToFixed } from '../otherFunctions/index.js';

const projectilesPrune = [
  'category',
  'shot_type',
  'high_air_resistance',
  'spin_type',
  'trajectory_sight',
  'effective_range',
  'minimum_range',
  'max_elevation',
  'muzzle_velocity',
  'marksmanship_bonus',
  'spread',
  'can_bounce',
  'collision_radius',
  'base_reload_time',
  'calibration_distance',
  'calibration_area',
  'projectile_display',
  'overhead_stat_effect',
  'projectile_audio',
  'can_damage_buildings',
  'burst_shot_delay',
  'gravity',
  'mass',
  'homing_params',
  'first_person_params',
  'can_target_airborne',
  'fixed_elevation',
  'projectile_penetration',
  'expiry_range',
  'is_beam_launch_burst',
  'expire_on_impact',
  'can_roll',
  'trail_always_on',
  'fired_by_mount',
  'lock_on_multiple_fire_pos',
  'prefer_central_targets',
  'can_damage_vehicles',
  'building_damage_multiplier',
  'scaling_damage',
  'is_spell',
  'vegetation_ignore_time',
  'missile_mirror_start_time',
];

const projectiles_specialAbilityPhases = (projectiles, specialAbilityPhases) => {
  const stapledTable = projectiles.map((projectile) => {
    projectilesPrune.forEach((prune) => delete projectile[prune]);

    projectile.projectile_number = parseInt(projectile.projectile_number);
    projectile.projectile_number > 1 ? undefined : delete projectile.projectile_number;
    projectile.damage = parseInt(projectile.damage);
    projectile.ap_damage = parseInt(projectile.ap_damage);
    projectile.bonus_v_infantry = parseInt(projectile.bonus_v_infantry);
    projectile.bonus_v_large = parseInt(projectile.bonus_v_large);
    projectile.shockwave_radius = parseFloatToFixed(projectile.shockwave_radius);
    projectile.burst_size = parseInt(projectile.burst_size);
    projectile.burst_size > 1 ? undefined : delete projectile.burst_size;
    projectile.is_magical = JSON.parse(projectile.is_magical);
    projectile.is_flaming = projectile.ignition_amount >= 1 ? true : false;
    delete projectile.ignition_amount;
    projectile.shots_per_volley = parseInt(projectile.shots_per_volley);
    projectile.shots_per_volley > 1 ? undefined : delete projectile.shots_per_volley;
    // WH2 Doesn't have can_damage_allies
    if (projectile.can_damage_allies) {
      projectile.can_damage_allies = JSON.parse(projectile.can_damage_allies);
    }

    ['bonus_v_infantry', 'bonus_v_large', 'is_magical', 'is_flaming'].forEach((key) => {
      if (!projectile[key]) {
        delete projectile[key];
      }
    });

    if (projectile.contact_stat_effect) {
      const relatedContactEffect = specialAbilityPhases.find((phase) => phase.id === projectile.contact_stat_effect);
      if (relatedContactEffect !== undefined) {
        projectile.contact_stat_effect = relatedContactEffect;
      }
    } else {
      delete projectile.contact_stat_effect;
    }
    return { ...projectile };
  });
  return stapledTable;
};

export default projectiles_specialAbilityPhases;
