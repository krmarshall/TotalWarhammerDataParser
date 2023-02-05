const characterSkillNodes_characterSkills = (characterSkillNodes, characterSkills) => {
  const skillMap = {};
  characterSkills.forEach((skill) => {
    skillMap[skill.key] = skill;
  });

  const stapledTable = characterSkillNodes.map((characterSkillNode) => {
    delete characterSkillNode.campaign_key;

    const relatedSkill = skillMap[characterSkillNode.character_skill_key];

    const tempNode = { ...relatedSkill, ...characterSkillNode };
    tempNode.character_skill_key;

    tempNode.tier = parseInt(tempNode.tier);
    tempNode.indent = parseInt(tempNode.indent);
    tempNode.points_on_creation =
      relatedSkill?.points_on_creation !== undefined ? relatedSkill.points_on_creation : parseInt(tempNode.points_on_creation);
    tempNode.required_num_parents = parseInt(tempNode.required_num_parents);
    tempNode.visible_in_ui = JSON.parse(tempNode.visible_in_ui);

    return tempNode;
  });
  return stapledTable;
};

export default characterSkillNodes_characterSkills;
