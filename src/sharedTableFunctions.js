import ancillariesPrune from './pruneLists/ancillariesPrune.js';
import characterSkillsPrune from './pruneLists/characterSkillsPrune.js';
import characterSkillLevelDetailsPrune from './pruneLists/characterSkillLevelDetailsPrune.js';
import characterSkillNodesPrune from './pruneLists/characterSkillNodesPrune.js';

let recordProcessedCount = 0;
const printRecordCount = (count) => {
  if (count % 10 === 0) {
    process.stdout.cursorTo(0);
    process.stdout.write(`Records Processed: ${count}`);
  }
};

// If you read this im sorry.
const staple_effects_effectsLoc = (effects, effectsLoc) => {
  const stapledTable = effects.map((effect) => {
    const locDescription = effectsLoc.find((effectLoc) => {
      return effectLoc.key === `effects_description_${effect.effect}`;
    });
    effect.description = locDescription.text;
    delete effect.icon_negative;

    printRecordCount(++recordProcessedCount);
    return { ...effect };
  });
  return stapledTable;
};

const staple_ancillariesToEffects_effects = (ancillariesToEffects, effects) => {
  const stapledTable = ancillariesToEffects.map((ancillaryToEffect) => {
    const relatedEffect = effects.find((effect) => {
      return effect.effect === ancillaryToEffect.effect;
    });
    ancillaryToEffect.effect = { ...relatedEffect };

    printRecordCount(++recordProcessedCount);
    return { ...ancillaryToEffect };
  });
  return stapledTable;
};

const staple_ancillaries_ancillariesToEffects = (ancillaries, ancillariesToEffects) => {
  const stapledTable = ancillaries.map((ancillary) => {
    ancillariesPrune.forEach((prune) => {
      delete ancillary[prune];
    });

    const relatedEffects = ancillariesToEffects.filter((ancillaryToEffect) => {
      return ancillaryToEffect.ancillary === ancillary.key;
    });

    if (relatedEffects.length) {
      relatedEffects.forEach((relatedEffect) => {
        relatedEffect.effect.value = relatedEffect.value;
        relatedEffect.effect.effect_scope = relatedEffect.effect_scope;

        if (ancillary.effects === undefined) {
          ancillary.effects = [];
        }
        ancillary.effects.push({ ...relatedEffect.effect });
      });
    }
    printRecordCount(++recordProcessedCount);
    return { ...ancillary };
  });
  return stapledTable;
};

const staple_characterSkillLevelToAncillariesJunction_ancillaries = (characterSkillLevelToAncillariesJunction, ancillaries) => {
  const stapledTable = characterSkillLevelToAncillariesJunction.map((record) => {
    const relatedAncillary = ancillaries.find((ancillary) => {
      return ancillary.key === record.granted_ancillary;
    });
    if (relatedAncillary != undefined) {
      record.ancillary = relatedAncillary;
      delete record.granted_ancillary;
    }

    printRecordCount(++recordProcessedCount);
    return { ...record };
  });
  return stapledTable;
};

const staple_characterSkillsToQuestAncillaries_ancillaries = (characterSkillsToQuestAncillaries, ancillaries) => {
  const stapledTable = characterSkillsToQuestAncillaries.map((characterSkill) => {
    const relatedAncillary = ancillaries.find((ancillary) => {
      return ancillary.key === characterSkill.ancillary;
    });
    if (relatedAncillary != undefined) {
      characterSkill.ancillary = relatedAncillary;
    }
    characterSkill.level = '1';
    characterSkill.use_quest_for_prefix;

    printRecordCount(++recordProcessedCount);
    return { ...characterSkill };
  });
  return stapledTable;
};

const staple_effects_characterSkillLevelToEffectsJunction = (effects, characterSkillLevelToEffectsJunction) => {
  const stapledTable = characterSkillLevelToEffectsJunction.map((record) => {
    const relatedEffect = effects.find((effect) => {
      return effect.effect === record.effect_key;
    });

    // Most skills have an effect that increases or decreases agent action chances, if I dont want to display these in the future uncomment these sections
    // if (
    //   (relatedEffect.effect === 'wh_main_effect_agent_action_success_chance_enemy_skill' &&
    //     relatedEffect.priority === '0') ||
    //   (relatedEffect.effect === 'wh_main_effect_agent_action_success_chance_skill' && relatedEffect.priority === '0')
    // ) {
    //   return;
    // }
    delete record.effect_key;
    relatedEffect.key = relatedEffect.effect;
    record.effect = { ...relatedEffect };
    delete record.effect.effect;

    printRecordCount(++recordProcessedCount);
    return { ...record };
  });

  // const filteredTable = stapledTable.filter((record) => {
  //   return record != null;
  // });
  // return filteredTable;
  return stapledTable;
};

// The localised_name and localised_description seem to be mostly accurate to the vanilla locs, might be more important for modded packs.
const staple_characterSkills_characterSkillsLoc = (characterSkills, characterSkillsLoc) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const locName = characterSkillsLoc.find((characterSkillLoc) => {
      return characterSkillLoc.key === `character_skills_localised_name_${characterSkill.key}`;
    });
    delete characterSkill.localised_name;
    characterSkill.name = locName.text;

    const locDescription = characterSkillsLoc.find((characterSkillLoc) => {
      return characterSkillLoc.key === `character_skills_localised_description_${characterSkill.key}`;
    });
    delete characterSkill.localised_description;
    characterSkill.description = locDescription.text;

    printRecordCount(++recordProcessedCount);
    return { ...characterSkill };
  });
  return stapledTable;
};

const staple_characterSkills_characterSkillLevelDetails = (characterSkills, characterSkillLevelDetails) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    characterSkillsPrune.forEach((prune) => {
      delete characterSkill[prune];
    });

    const relatedRecords = characterSkillLevelDetails.filter((record) => {
      return record.skill_key === characterSkill.key;
    });

    if (relatedRecords.length) {
      relatedRecords.forEach((relatedRecord) => {
        characterSkillLevelDetailsPrune.forEach((prune) => {
          delete relatedRecord[prune];
        });

        if (characterSkill.levels === undefined) {
          characterSkill.levels = [];
        }
        relatedRecord.unlocked_at_rank++;
        characterSkill.levels[relatedRecord.level - 1] = { ...relatedRecord };
        delete characterSkill.levels[relatedRecord.level - 1].level;
        delete characterSkill.levels[relatedRecord.level - 1].skill_key;
      });
    }

    printRecordCount(++recordProcessedCount);
    return { ...characterSkill };
  });
  return stapledTable;
};

const staple_characterSkills_characterSkillLevelToEffectsJunction = (characterSkills, characterSkillLevelToEffectsJunction) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const relatedRecords = characterSkillLevelToEffectsJunction.filter((record) => {
      return record.character_skill_key === characterSkill.key;
    });

    if (relatedRecords.length) {
      relatedRecords.forEach((relatedRecord) => {
        relatedRecord.effect.value = relatedRecord.value;
        relatedRecord.effect.effect_scope = relatedRecord.effect_scope;
        delete relatedRecord.value;
        delete relatedRecord.effect_scope;
        relatedRecord.effects = { ...relatedRecord.effect };
        delete relatedRecord.effect;

        if (characterSkill.levels === undefined) {
          characterSkill.levels = [];
        }
        if (characterSkill.levels[relatedRecord.level - 1] === undefined) {
          characterSkill.levels[relatedRecord.level - 1] = {};
        }
        if (characterSkill.levels[relatedRecord.level - 1].effects === undefined) {
          characterSkill.levels[relatedRecord.level - 1].effects = [];
        }
        characterSkill.levels[relatedRecord.level - 1].effects.push(relatedRecord.effects);
      });
    }

    printRecordCount(++recordProcessedCount);
    return { ...characterSkill };
  });

  return stapledTable;
};

const staple_characterSkills_characterSkillLevelToAncillariesJunction = (characterSkills, characterSkillLevelToAncillariesJunction) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const relatedAncillary = characterSkillLevelToAncillariesJunction.find((ancillary) => {
      return ancillary.skill === characterSkill.key;
    });
    if (relatedAncillary?.ancillary?.effects != undefined) {
      if (characterSkill.levels === undefined) {
        characterSkill.levels = [];
      }
      if (characterSkill.levels[relatedAncillary.level - 1] === undefined) {
        characterSkill.levels[relatedAncillary.level - 1] = {};
      }
      if (characterSkill.levels[relatedAncillary.level - 1].effects === undefined) {
        characterSkill.levels[relatedAncillary.level - 1].effects = [];
      }

      characterSkill.levels[relatedAncillary.level - 1].effects.forEach((charSkillEffect) => {
        relatedAncillary.ancillary.effects.forEach((ancillaryEffect, index) => {
          if (ancillaryEffect.priority === charSkillEffect.priority) {
            relatedAncillary.ancillary.effects.splice(index, 1);
          }
        });
      });

      characterSkill.levels[relatedAncillary.level - 1].effects.push(...relatedAncillary.ancillary.effects);
    }

    printRecordCount(++recordProcessedCount);
    return { ...characterSkill };
  });
  return stapledTable;
};

const staple_characterSkills_characterSkillsToQuestAncillaries = (characterSkills, characterSkillsToQuestAncillaries) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const relatedAncillary = characterSkillsToQuestAncillaries.find((ancillary) => {
      return ancillary.skill === characterSkill.key;
    });
    if (relatedAncillary?.ancillary?.effects != undefined) {
      if (characterSkill.levels === undefined) {
        characterSkill.levels = [];
      }
      if (characterSkill.levels[relatedAncillary.level - 1] === undefined) {
        characterSkill.levels[relatedAncillary.level - 1] = {};
      }
      if (characterSkill.levels[relatedAncillary.level - 1].effects === undefined) {
        characterSkill.levels[relatedAncillary.level - 1].effects = [];
      }

      characterSkill.levels[relatedAncillary.level - 1].effects.forEach((charSkillEffect) => {
        relatedAncillary.ancillary.effects.forEach((ancillaryEffect, index) => {
          if (ancillaryEffect.priority === charSkillEffect.priority) {
            relatedAncillary.ancillary.effects.splice(index, 1);
          }
        });
      });

      characterSkill.levels[relatedAncillary.level - 1].effects.push(...relatedAncillary.ancillary.effects);
      characterSkill.use_quest_for_prefix = relatedAncillary.use_quest_for_prefix;
    }

    printRecordCount(++recordProcessedCount);
    return { ...characterSkill };
  });
  return stapledTable;
};

const staple_characterSkillNodes_characterSkills = (characterSkillNodes, characterSkills) => {
  const stapledTable = characterSkillNodes.map((characterSkillNode) => {
    characterSkillNodesPrune.forEach((prune) => {
      delete characterSkillNode[prune];
    });
    const relatedSkill = characterSkills.find((characterSkill) => {
      return characterSkill.key === characterSkillNode.character_skill_key;
    });
    const tempNode = { ...relatedSkill, ...characterSkillNode };
    tempNode.character_skill_key;

    printRecordCount(++recordProcessedCount);
    return tempNode;
  });
  return stapledTable;
};

const staple_characterSkillNodes_characterSkillNodeLinks = (characterSkillNodes, characterSkillNodeLinks) => {
  const stapledTable = characterSkillNodes.map((node) => {
    const relatedLinks = characterSkillNodeLinks.filter((nodeLink) => {
      return nodeLink.child_key === node.key;
    });
    const parentRequired = [];
    const parentSubsetRequired = [];
    relatedLinks.forEach((link) => {
      if (link.link_type === 'REQUIRED') {
        parentRequired.push(link.parent_key);
      } else if (link.link_type === 'SUBSET_REQUIRED') {
        parentSubsetRequired.push(link.parent_key);
      }
    });
    node.parent_required = parentRequired.length ? parentRequired : undefined;
    node.parent_subset_required = parentSubsetRequired.length ? parentSubsetRequired : undefined;

    printRecordCount(++recordProcessedCount);
    return { ...node };
  });
  return stapledTable;
};

const staple_characterSkillNodes_characterSkillNodesSkillLocks = (characterSkillNodes, characterSkillNodesSkillLocks) => {
  const stapleTables = characterSkillNodes.map((node) => {
    const relatedSkillLocks = characterSkillNodesSkillLocks.filter((skillLock) => {
      return skillLock.character_skill_node === node.key;
    });
    relatedSkillLocks.forEach((skillLock) => {
      if (node.levels[skillLock.level - 1].blocks_character_skill_key === undefined) {
        node.levels[skillLock.level - 1].blocks_character_skill_key = [];
      }
      if (!node.levels[skillLock.level - 1].blocks_character_skill_key.includes(skillLock.character_skill)) {
        node.levels[skillLock.level - 1].blocks_character_skill_key.push(skillLock.character_skill);
      }
    });

    printRecordCount(++recordProcessedCount);
    return { ...node };
  });
  return stapleTables;
};

const staple_cultures_culturesLoc = (cultures, culturesLoc) => {
  const placeholderIndex = cultures.findIndex((culture) => {
    return culture.key === '*';
  });
  cultures.splice(placeholderIndex, 1);

  const rogueIndex = cultures.findIndex((culture) => {
    return culture.key === 'wh2_main_rogue';
  });
  cultures.splice(rogueIndex, 1);

  const stapledTable = cultures.map((culture) => {
    const relatedLoc = culturesLoc.find((loc) => {
      return loc.key === `cultures_name_${culture.key}`;
    });
    const tempCulture = { key: culture.key, name: relatedLoc.text };

    printRecordCount(++recordProcessedCount);
    return { ...tempCulture };
  });
  return stapledTable;
};

// Norsca is treated wonky, subculture exists under chaos so lots of hardcoding fixes here, check with mods/tw3
const staple_cultures_culturesSubcultures = (cultures, culturesSubcultures) => {
  const stapledTable = cultures.map((culture) => {
    const relatedSubcultures = culturesSubcultures.filter((subculture) => {
      return subculture.culture === culture.key;
    });
    culture.subcultures = [];
    relatedSubcultures.forEach((subculture) => {
      culture.subcultures.push(subculture.subculture);
    });

    printRecordCount(++recordProcessedCount);
    return { ...culture };
  });

  // Hardcoded fixes z.z
  const norscaIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh_dlc08_nor_norsca';
  });
  stapledTable[norscaIndex].subcultures = ['wh_main_sc_nor_norsca'];

  const chaosIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh_main_chs_chaos';
  });
  stapledTable[chaosIndex].subcultures = ['wh_main_sc_chs_chaos'];

  const empireIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh_main_emp_empire';
  });
  stapledTable[empireIndex].subcultures = ['wh_main_sc_emp_empire'];

  const greenskinsIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh_main_grn_greenskins';
  });
  stapledTable[greenskinsIndex].subcultures = ['wh_main_sc_grn_greenskins'];

  stapledTable.forEach((culture) => {
    culture.subculture = culture.subcultures[0];
    delete culture.subcultures;
  });

  return stapledTable;
};

const staple_cultures_factions = (cultures, factions) => {
  const stapledTable = cultures.map((culture) => {
    const relatedFactions = factions.filter((faction) => {
      return faction.subculture === culture.subculture;
    });
    if (relatedFactions.length) {
      if (culture.factions === undefined) {
        culture.factions = [];
      }
      relatedFactions.forEach((faction) => {
        // MP available seems convenient check but missing some lords :-/
        if (!culture.factions.includes(faction.key) /*&& faction.mp_available === 'true'*/) {
          culture.factions.push(faction.key);
        }
      });
    }

    printRecordCount(++recordProcessedCount);
    return { ...culture };
  });
  return stapledTable;
};

const staple_cultures_factionAgentPermittedSubtypes = (cultures, factionAgentPermittedSubtypes) => {
  const stapledTable = cultures.map((culture) => {
    const relatedAgents = factionAgentPermittedSubtypes.filter((agent) => {
      let intersects = false;
      culture.factions.forEach((faction) => {
        if (agent.faction === faction) {
          intersects = true;
        }
      });
      return intersects;
    });

    if (relatedAgents.length) {
      culture.agents = [];
      relatedAgents.forEach((agent) => {
        if (agent.subtype !== 'default' && !culture.agents.includes(agent.subtype)) {
          culture.agents.push(agent.subtype);
        }
      });
    }

    printRecordCount(++recordProcessedCount);
    return { ...culture };
  });
  return stapledTable;
};

export {
  staple_effects_effectsLoc,
  staple_ancillariesToEffects_effects,
  staple_ancillaries_ancillariesToEffects,
  staple_characterSkillLevelToAncillariesJunction_ancillaries,
  staple_characterSkillsToQuestAncillaries_ancillaries,
  staple_effects_characterSkillLevelToEffectsJunction,
  staple_characterSkills_characterSkillsLoc,
  staple_characterSkills_characterSkillLevelDetails,
  staple_characterSkills_characterSkillLevelToEffectsJunction,
  staple_characterSkills_characterSkillLevelToAncillariesJunction,
  staple_characterSkills_characterSkillsToQuestAncillaries,
  staple_characterSkillNodes_characterSkills,
  staple_characterSkillNodes_characterSkillNodeLinks,
  staple_characterSkillNodes_characterSkillNodesSkillLocks,
  staple_cultures_culturesLoc,
  staple_cultures_culturesSubcultures,
  staple_cultures_factions,
  staple_cultures_factionAgentPermittedSubtypes,
};
