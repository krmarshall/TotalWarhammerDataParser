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
      tech.effects = [];
      relatedRecords.forEach((relatedRecord) => {
        const tempObj = {
          key: relatedRecord.effect.key,
          description: relatedRecord.effect.description,
          value: relatedRecord.effect.value,
          icon: relatedRecord.effect.icon,
          priority: relatedRecord.effect.priority,
          is_positive_value_good: relatedRecord.effect.is_positive_value_good,
        };

        if (relatedRecord.effect.related_abilities !== undefined) {
          tempObj.related_abilities = JSON.parse(JSON.stringify(relatedRecord.effect.related_abilities));
        }

        tech.effects.push(tempObj);
      });

      tech.effects.sort((a, b) => a.priority - b.priority);
    }
    return { ...tech };
  });
  return stapledTable;
};

export default techs_techEffectsJunc;
