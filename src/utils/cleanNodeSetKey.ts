// If regex is a perf issue memoize this?
const cleanNodeSetKey = (key: string) => {
  const keyName = key.split(
    /node_set_|_skill_node_(?!set_)|variety_agent_subtype_|wh[0-3]?_dlc[0-9]?[0-9]?_|rad_wh3_part3_main_unit_|^kou_skill_|^dust_skill_|^wh[0-3]?_pro[0-9]?[0-9]?_/
  );
  const cleanedKeyName = keyName[keyName.length - 1].replace(/_(skills?)?(_?nodes?)?(_?sets?)?$/, '');
  return cleanedKeyName;
};

export default cleanNodeSetKey;
