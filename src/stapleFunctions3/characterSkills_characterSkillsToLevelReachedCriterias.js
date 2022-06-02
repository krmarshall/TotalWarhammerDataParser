const characterSkills_characterSkillsToLevelReachedCriterias = (characterSkills, characterSkillsToLevelReachedCriterias) => {
  const stapledTable = characterSkills.map((skill) => {
    const relatedCriteria = characterSkillsToLevelReachedCriterias.find((criteria) => criteria.skill_key === skill.key);
    if (relatedCriteria !== undefined) {
      if (relatedCriteria.level === '0') {
        skill.points_on_creation = 1;
      } else {
        skill.levels[relatedCriteria.rank - 1].auto_unlock_at_rank = parseInt(relatedCriteria.level) + 1;
      }
    }

    return { ...skill };
  });

  return stapledTable;
};

export default characterSkills_characterSkillsToLevelReachedCriterias;
