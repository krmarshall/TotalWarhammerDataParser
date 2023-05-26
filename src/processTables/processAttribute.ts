import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import findImage from '../utils/findImage';
import stringInterpolator from '../utils/stringInterpolator';

const processAttribute = (folder: string, globalData: GlobalDataInterface, attribute: TableRecord) => {
  const returnAttribute = {
    key: attribute.attribute,
    description: stringInterpolator(attribute.localRefs?.unit_attributes?.imued_effect_text as string, globalData.parsedData[folder].text),
    icon: findAttributeImage(folder, globalData, attribute.attribute),
  };
  if (attribute.attribute_type === 'negative') {
    returnAttribute.description = 'Removes ' + returnAttribute.description.trimStart();
  }

  return returnAttribute;
};

export default processAttribute;

const findAttributeImage = (folder: string, globalData: GlobalDataInterface, attributeKey: string) => {
  const searchArray = [
    `campaign_ui/effect_bundles/attribute_${attributeKey}`,
    `campaign_ui/effect_bundles/attribute_${attributeKey.toLowerCase()}`,
    `battle_ui/ability_icons/${attributeKey}`,
    `battle_ui/ability_icons/${attributeKey.toLowerCase()}`,
  ];

  return findImage(folder, globalData, searchArray, attributeKey);
};
