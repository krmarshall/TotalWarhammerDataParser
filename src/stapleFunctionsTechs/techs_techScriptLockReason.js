import { stringInterpolator } from '../otherFunctions/index.js';

const techs_techScriptLockReason = (techs, techScriptLockReason, combinedLoc) => {
  const stapledTable = techs.map((tech) => {
    const relatedLock = techScriptLockReason.find((lock) => lock === tech.key);

    if (relatedLock !== undefined) {
      let relatedString = combinedLoc[`technology_script_lock_reasons_lock_reason_${tech.key}`];
      if (relatedString === undefined) {
        relatedString = combinedLoc[`technology_script_lock_reasons_lock_reason_tech_${tech.key}`];
        if (relatedString === undefined) {
          relatedString = 'MISSING SCRIPT LOCK';
        } else {
          relatedString = relatedString.replace('\\\\n[[col:yellow]]Current Amount: %d[[/col]]', '');
        }
      }
      tech.script_lock = stringInterpolator(relatedString, combinedLoc, []);
    }
    return { ...tech };
  });
  return stapledTable;
};

export default techs_techScriptLockReason;
