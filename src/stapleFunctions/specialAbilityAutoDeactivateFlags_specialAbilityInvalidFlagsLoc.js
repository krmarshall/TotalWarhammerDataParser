import { stringInterpolator } from '../otherFunctions/index.js';

const specialAbilityAutoDeactivateFlags_specialAbilityInvalidFlagsLoc = (
  specialAbilityAutoDeactivateFlags,
  specialAbilityInvalidFlagsLoc,
  uiTextReplacements,
  missingTextReplacements
) => {
  const stapledTable = specialAbilityAutoDeactivateFlags.map((abilityFlag) => {
    const relatedLoc = specialAbilityInvalidFlagsLoc.find(
      (loc) => `special_ability_invalid_usage_flags_alt_description_${abilityFlag.deactivate_flag}` === loc.key
    );
    if (relatedLoc !== undefined) {
      let temp = stringInterpolator(relatedLoc.text, uiTextReplacements, missingTextReplacements);

      // Some skills enable on having more than x kills, these leave %d flags that need to be replaced based on what the flag is
      let dValue = 'UNKNOWN';
      if (abilityFlag.deactivate_flag === 'unit_tier1_kills') {
        dValue = '40';
      } else if (abilityFlag.deactivate_flag === 'unit_tier2_kills') {
        dValue = '80';
      } else if (abilityFlag.deactivate_flag === 'unit_tier3_kills') {
        dValue = '120';
      }

      abilityFlag.enabled_if = temp.replace('%d', dValue);
    }
    return { ...abilityFlag };
  });
  return stapledTable;
};

export default specialAbilityAutoDeactivateFlags_specialAbilityInvalidFlagsLoc;
