const characterSkillLevelToAncillariesJunction_ancillaries = (characterSkillLevelToAncillariesJunction, ancillaries) => {
  const stapledTable = characterSkillLevelToAncillariesJunction.map((record) => {
    const relatedAncillary = ancillaries.find((ancillary) => {
      return ancillary.key === record.granted_ancillary;
    });
    if (relatedAncillary != undefined) {
      record.ancillary = { ...relatedAncillary };
      delete record.granted_ancillary;
    }

    return { ...record };
  });
  return stapledTable;
};

export default characterSkillLevelToAncillariesJunction_ancillaries;
