const characterSkills_characterSkillsToLevelReachedCriterias = (characterSkills, characterSkillsToLevelReachedCriterias) => {
  const stapledTable = characterSkills.map((skill) => {
    const relatedCriteria = characterSkillsToLevelReachedCriterias.find((criteria) => criteria.skill_key === skill.key);
    if (relatedCriteria !== undefined) {
      if (relatedCriteria.level === '0') {
        skill.points_on_creation = 1;
      } else {
        if (skill.levels?.[relatedCriteria.rank - 1] !== undefined) {
          skill.levels[relatedCriteria.rank - 1].auto_unlock_at_rank = parseInt(relatedCriteria.level) + 1;
          delete skill.levels[relatedCriteria.rank - 1].unlocked_at_rank;
        }
      }
    }

    return { ...skill };
  });

  return stapledTable;
};

export default characterSkills_characterSkillsToLevelReachedCriterias;
