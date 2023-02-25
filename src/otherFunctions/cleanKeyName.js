// If regex is a perf issue memoize this?
const cleanKeyName = (key) => {
  // node_set_ vanilla, _skill_node_(?!set_) radious2, variety_agent_subtype_ radious2, wh3_dlc20_ CoC DLC, rad_wh3_part3_main_unit_ radious3
  const keyName = key.split(/node_set_|_skill_node_(?!set_)|variety_agent_subtype_|wh3_dlc20_|rad_wh3_part3_main_unit_|^kou_skill_/);
  // _skill_node radious, _skills legendary characters, _node_set and _nodeset scm3
  const cleanedKeyName = keyName[keyName.length - 1].replace(/_skill_node$|_skills$|_node_set$|_nodeset$/, '');
  return cleanedKeyName;
};

export default cleanKeyName;
