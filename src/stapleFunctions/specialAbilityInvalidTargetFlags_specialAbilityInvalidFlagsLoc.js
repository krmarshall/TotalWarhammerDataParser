import { stringInterpolator } from '../otherFunctions/index.js';

const specialAbilityInvalidTargetFlags_specialAbilityInvalidFlagsLoc = (
  specialAbilityInvalidTargetFlags,
  specialAbilityInvalidFlagsLoc,
  uiTextReplacements,
  missingTextReplacements
) => {
  const stapledTable = specialAbilityInvalidTargetFlags.map((abilityFlag) => {
    const relatedLoc = specialAbilityInvalidFlagsLoc.find(
      (loc) => `special_ability_invalid_usage_flags_alt_description_${abilityFlag.invalid_target}` === loc.key
    );
    if (relatedLoc !== undefined) {
      let temp = stringInterpolator(relatedLoc.text, uiTextReplacements, missingTextReplacements);

      // Some skills enable on having more than x kills, these leave %d flags that need to be replaced based on what the flag is
      let dValue = 'UNKNOWN';
      if (abilityFlag.invalid_target === 'unit_tier1_kills') {
        dValue = '40';
      } else if (abilityFlag.invalid_target === 'unit_tier2_kills') {
        dValue = '80';
      } else if (abilityFlag.invalid_target === 'unit_tier3_kills') {
        dValue = '120';
      }

      abilityFlag.target_if = temp.replace('%d', dValue);
    }
    return { ...abilityFlag };
  });
  return stapledTable;
};

export default specialAbilityInvalidTargetFlags_specialAbilityInvalidFlagsLoc;
