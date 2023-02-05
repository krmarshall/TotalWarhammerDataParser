import wh2QuestNodePrune from '../lists/wh2QuestNodePrune.js';
import cleanKeyName from './cleanKeyName.js';
import { cultureMap, subcultureMap } from '../lists/cultureMap.js';
import log from '../log.js';

const collate_characterSkillNodes = (characterSkillNodes, charList) => {
  const skillNodesMap = {};
  characterSkillNodes.forEach((node) => {
    if (node.character_skill_node_set_key.includes('_pro_')) {
      // Dont include prologue skill node sets
    } else {
      const nodeSetKey = cleanKeyName(node.character_skill_node_set_key);
      if (skillNodesMap[nodeSetKey] === undefined) {
        skillNodesMap[nodeSetKey] = [];
      }

      skillNodesMap[nodeSetKey].push(node);
    }
  });

  const factionKeys = Object.keys(charList);
  factionKeys.forEach((factionKey) => {
    const cleanFactionKey = factionKey.replace(/_lords|_heroes/, '');
    const factionCharKeys = Object.keys(charList[factionKey]);
    factionCharKeys.forEach((charKey) => {
      const charNodes = skillNodesMap[charKey];
      if (charNodes === undefined) {
        log(`character missing skillNodes: ${charKey}`, 'yellow');
      } else {
        const charNodeSet = charList[factionKey][charKey];
        charNodeSet.skillTree = [[], [], [], [], [], []];
        charNodeSet.key = charKey;

        charNodes.forEach((node) => {
          // WH2 Quest Items
          if (node.use_quest_for_prefix) {
            if (charNodeSet.items === undefined) {
              charNodeSet.items = [];
            }
            wh2QuestNodePrune.forEach((prune) => {
              delete node[prune];
            });
            const tempNode = { ...node };
            tempNode.effects = tempNode.levels[0].effects;
            delete tempNode.levels;
            delete tempNode.faction_key;
            delete tempNode.subculture;
            charNodeSet.items.push(tempNode);

            // If its hero action success scaling dont add to tree.
          } else if (node.character_skill_key === 'wh3_main_skill_agent_action_success_scaling') {
            // Do Nothing
            // Cryswars Leaders of Legend 3 shoves vanilla nodes into indent 7 tier 99 to hide them without data coring
          } else if (node.indent === 7 && node.tier === 99) {
            // Do nothing
            // Push BG skills into their own array
          } else if (node.is_background_skill || !node.visible_in_ui) {
            if (charNodeSet.backgroundSkills === undefined) {
              charNodeSet.backgroundSkills = [];
            }
            const tempNode = { ...node };
            delete tempNode.faction_key;
            delete tempNode.subculture;
            charNodeSet.backgroundSkills.push(tempNode);
            // Check faction/subculture
          } else if (
            (node.faction_key !== '' && cultureMap[node.faction_key] !== cleanFactionKey) ||
            (node.subculture !== '' && subcultureMap[node.subculture] !== cleanFactionKey)
          ) {
            // Do nothing
            // Finally add to skill tree
          } else if (node.indent <= 5) {
            if (charNodeSet.skillTree[node.indent] === undefined) {
              charNodeSet.skillTree[node.indent] = [];
            }
            const tempNode = { ...node };
            delete tempNode.faction_key;
            delete tempNode.subculture;
            delete tempNode.character_skill_node_set_key;
            charNodeSet.skillTree[node.indent][node.tier] = tempNode;
          }
        });
      }
    });
  });

  return charList;
};

export default collate_characterSkillNodes;
