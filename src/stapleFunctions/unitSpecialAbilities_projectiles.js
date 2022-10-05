const unitSpecialAbilities_projectiles = (unitSpecialAbilities, projectiles) => {
  const stapledTable = unitSpecialAbilities.map((ability) => {
    if (ability.activated_projectile) {
      const relatedProjectile = projectiles.find((projectile) => projectile.key === ability.activated_projectile);
      if (relatedProjectile !== undefined) {
        ability.activated_projectile = relatedProjectile;
      }
    } else {
      delete ability.activated_projectile;
    }
    return { ...ability };
  });
  return stapledTable;
};

export default unitSpecialAbilities_projectiles;
