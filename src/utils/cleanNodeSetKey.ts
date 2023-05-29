// If regex is a perf issue memoize this?
const cleanNodeSetKey = (key: string) => {
  const keyName = key.split(
    /node_set_|_skill_node_(?!set_)|variety_agent_subtype_|wh3_dlc20_|rad_wh3_part3_main_unit_|^kou_skill_|^dust_skill_|^wh3_pro11_/
  );
  const cleanedKeyName = keyName[keyName.length - 1].replace(/_(skills?)?(_?nodes?)?(_?sets?)?$/, '');
  return cleanedKeyName;
};

export default cleanNodeSetKey;
