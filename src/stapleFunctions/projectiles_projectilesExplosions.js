const projectiles_projectilesExplosions = (projectiles, projectilesExplosions) => {
  const stapledTable = projectiles.map((projectile) => {
    if (projectile.explosion_type) {
      const relatedExplosion = projectilesExplosions.find((explosion) => explosion.key === projectile.explosion_type);
      if (relatedExplosion !== undefined) {
        projectile.explosion_type = relatedExplosion;
      }
    } else {
      delete projectile.explosion_type;
    }

    return { ...projectile };
  });
  return stapledTable;
};

export default projectiles_projectilesExplosions;
