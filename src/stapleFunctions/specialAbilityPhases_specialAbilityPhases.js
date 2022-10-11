const specialAbilityPhases_specialAbilityPhases = (specialAbilityPhases) => {
  const stapledTable = specialAbilityPhases.map((phase) => {
    if (phase.imbue_contact !== undefined) {
      const relatedContact = specialAbilityPhases.find((contact) => phase.imbue_contact === contact.id);
      if (relatedContact !== undefined) {
        phase.imbue_contact = relatedContact;
      }
    }
    return { ...phase };
  });
  return stapledTable;
};

export default specialAbilityPhases_specialAbilityPhases;
