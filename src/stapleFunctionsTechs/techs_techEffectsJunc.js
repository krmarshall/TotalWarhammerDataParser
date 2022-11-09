const techs_techEffectsJunc = (techs, techEffectsJunc) => {
  const techEffectsMap = {};
  techEffectsJunc.forEach((techEffect) => {
    if (techEffectsMap[techEffect.technology] === undefined) {
      techEffectsMap[techEffect.technology] = [];
    }
    techEffectsMap[techEffect.technology].push(techEffect);
  });

  const stapledTable = techs.map((tech) => {
    const relatedRecords = techEffectsMap[tech.key];

    if (relatedRecords !== undefined) {
      relatedRecords.forEach((relatedRecord) => {
        // If the record has effects instead of effect prop, it has already been parsed and doesnt need to have props shuffled around
        if (relatedRecord.effects === undefined) {
          relatedRecord.effect.value = relatedRecord.value;
          relatedRecord.effect.effect_scope = relatedRecord.effect_scope;
          delete relatedRecord.value;
          delete relatedRecord.effect_scope;
          relatedRecord.effects = { ...relatedRecord.effect };
          delete relatedRecord.effect;
        }
      });
      tech.effects = relatedRecords;

      tech.effects.sort((a, b) => a.priority - b.priority);
    }
    return { ...tech };
  });
  return stapledTable;
};

export default techs_techEffectsJunc;
