import log from '../log.js';

const techs_techRequiredBuildingJunc = (techs, techRequiredBuildingJunc, combinedLoc) => {
  const stapledTable = techs.map((tech) => {
    const relatedReqBuilding = techRequiredBuildingJunc.filter((reqBuilding) => reqBuilding.technology === tech.key);
    if (relatedReqBuilding.length > 0) {
      relatedReqBuilding.forEach((reqBuilding) => {
        let buildingName = combinedLoc[`building_culture_variants_name_${reqBuilding.required_building_level}`];
        if (buildingName === undefined) {
          const locKeys = Object.keys(combinedLoc).filter((locKey) => locKey.includes('building_culture_variants_name_'));
          // Could be more than 1 related, but just getting first since its basically a fallback anyways.
          const relatedLocKey = locKeys.find((locKey) => locKey.includes(reqBuilding.required_building_level));

          if (relatedLocKey !== undefined) {
            buildingName = combinedLoc[relatedLocKey];
          } else {
            log(`bad building name lookup: ${reqBuilding.required_building_level}`, 'yellow');
            buildingName = 'BAD NAME LOOKUP';
          }
        }

        if (tech.required_buildings === undefined) {
          tech.required_buildings = [];
        }
        tech.required_buildings.push(buildingName);
      });
    }
    return { ...tech };
  });
  return stapledTable;
};

export default techs_techRequiredBuildingJunc;
