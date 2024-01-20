import { writeJSON } from 'fs-extra';
import modIdMap from '../lists/modIdMap';

const modTimestamps = () => {
  const timestampObj: { [modHeader: string]: { [subMod: string]: number } } = {};
  const promiseArray: Array<Promise<void | Response>> = [];
  Object.entries(modIdMap).forEach((entry) => {
    const modHeader = entry[0];
    const subMods = entry[1];

    timestampObj[modHeader] = {};
    Object.entries(subMods).forEach((subEntry) => {
      const subHeader = subEntry[0];
      const subId = subEntry[1];
      promiseArray.push(
        fetch(`https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `itemcount=1&publishedfileids%5B0%5D=${subId}`,
        })
          .then((response) => response.json())
          .then((data) => {
            timestampObj[modHeader][subHeader] = data.response.publishedfiledetails[0].time_updated;
          }),
      );
    });
  });

  Promise.all(promiseArray).then(() => {
    writeJSON('./output/modTimestamps,json', timestampObj, { spaces: 2 });
  });
};

export default modTimestamps;
