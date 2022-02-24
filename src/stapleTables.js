import fse from 'fs-extra';
import ancillariesPrune from './pruneLists/ancillariesPrune.js';

const stapleVanillaTables = () => {
  const ancillaries = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/ancillaries_tables.json', 'utf-8'));
  const ancillaryTypes = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/ancillary_types_tables.json', 'utf-8'));
  const ancillariesLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/ancillaries.json', 'utf-8'));
  const ancillaries_AncillaryTypes = staple_Ancillaries_AncillaryTypes(ancillaries, ancillaryTypes, ancillariesLoc);

  const characterSkillLevelToAncillariesJunction = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_to_ancillaries_junctions_tables.json', 'utf-8')
  );
  const characterSkillLevelAncillary = staple_characterSkillLevelToAncillariesJunction_Ancillaries(
    characterSkillLevelToAncillariesJunction,
    ancillaries_AncillaryTypes
  );

  fse.outputFileSync('./test/test.json', JSON.stringify(characterSkillLevelAncillary, null, 2));
};

const staple_Ancillaries_AncillaryTypes = (ancillaries, ancillaryTypes, ancillariesLoc) => {
  const stapledTable = ancillaries.map((ancillary) => {
    ancillariesPrune.forEach((prune) => {
      delete ancillary[prune];
    });

    const relatedAncillaryType = ancillaryTypes.find((ancillaryType) => {
      return ancillaryType.type === ancillary.type;
    });
    ancillary.ui_icon = relatedAncillaryType.ui_icon;

    const locName = ancillariesLoc.find((ancillaryLoc) => {
      return ancillaryLoc.key === `ancillaries_onscreen_name_${ancillary.key}`;
    });
    ancillary.name = locName.text;

    const locText = ancillariesLoc.find((ancillaryLoc) => {
      return ancillaryLoc.key === `ancillaries_colour_text_${ancillary.key}`;
    });
    ancillary.text = locText.text;

    return ancillary;
  });
  return stapledTable;
};

const staple_characterSkillLevelToAncillariesJunction_Ancillaries = (
  characterSkillLevelToAncillariesJunction,
  ancillaries
) => {
  const stapledTable = characterSkillLevelToAncillariesJunction.map((characterSkillLevelToAncillaryJunction) => {
    const relatedAncillary = ancillaries.find((ancillary) => {
      return ancillary.key === characterSkillLevelToAncillaryJunction.granted_ancillary;
    });
    characterSkillLevelToAncillaryJunction.granted_ancillary = relatedAncillary;

    return characterSkillLevelToAncillaryJunction;
  });
  return stapledTable;
};

export { stapleVanillaTables };
