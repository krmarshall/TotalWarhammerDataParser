import { parseFloatToFixed } from '../otherFunctions/index.js';

const projectileBombardmentsPrune = [
  'launch_source',
  'launch_vfx',
  'launch_height',
  'audio_type',
  'launch_height_underground',
  'randomise_launch',
];

const projectileBombardments_projectiles = (projectileBombardments, projectiles) => {
  const stapledTable = projectileBombardments.map((bombardment) => {
    projectileBombardmentsPrune.forEach((prune) => delete bombardment[prune]);

    bombardment.num_projectiles = parseInt(bombardment.num_projectiles);
    bombardment.num_projectiles > 1 ? undefined : delete bombardment.num_projectiles;
    bombardment.start_time = parseFloatToFixed(bombardment.start_time);
    bombardment.arrival_window = parseFloatToFixed(bombardment.arrival_window);
    bombardment.radius_spread = parseFloatToFixed(bombardment.radius_spread);

    if (bombardment.projectile_type) {
      const relatedProjectile = projectiles.find((projectile) => projectile.key === bombardment.projectile_type);
      if (relatedProjectile !== undefined) {
        bombardment.projectile_type = relatedProjectile;
      }
    } else {
      delete bombardment.projectile_type;
    }
    return { ...bombardment };
  });
  return stapledTable;
};

export default projectileBombardments_projectiles;
