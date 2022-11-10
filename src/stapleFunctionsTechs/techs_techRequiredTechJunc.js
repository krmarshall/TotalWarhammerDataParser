const techs_techRequiredTechJunc = (techs, techRequiredTechJunc) => {
  const stapledTable = techs.map((tech) => {
    const relatedReqTechs = techRequiredTechJunc.filter((reqTech) => reqTech.technology === tech.key);
    if (relatedReqTechs.length > 0) {
      relatedReqTechs.forEach((reqTech) => {
        const relatedTech = techs.find((findTech) => findTech.key === reqTech.required_technology);

        if (relatedTech !== undefined) {
          if (tech.required_techs === undefined) {
            tech.required_techs = [];
          }
          tech.required_techs.push({ key: relatedTech.key, name: relatedTech.name });
        }
      });
    }
    return { ...tech };
  });
  return stapledTable;
};

export default techs_techRequiredTechJunc;
