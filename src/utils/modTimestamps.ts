import { readJSONSync, writeJSON } from 'fs-extra';
import modIdMap from '../lists/modIdMap';
import log from './log';

interface TimeStampInterface {
  [modHeader: string]: { [subMod: string]: number };
}

const modTimestamps = () => {
  const oldTimestamps = readJSONSync(`${process.env.TWP_DATA_PATH}/modTimestamps.json`);
  const timestampObj: TimeStampInterface = {};
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
            if (data.response.publishedfiledetails[0].time_updated === undefined) {
              timestampObj[modHeader][subHeader] = oldTimestamps[modHeader][subHeader];
            } else {
              timestampObj[modHeader][subHeader] = data.response.publishedfiledetails[0].time_updated;
            }
          })
          .catch((error) => {
            log(`Timestamp Error: ${error}`, 'red');
          }),
      );
    });
  });

  Promise.all(promiseArray).then(() => {
    const sortedObj: TimeStampInterface = {};
    Object.keys(timestampObj)
      .sort()
      .forEach((key) => {
        sortedObj[key] = {};
        Object.keys(timestampObj[key])
          .sort()
          .forEach((subKey) => {
            sortedObj[key][subKey] = timestampObj[key][subKey];
          });
      });
    writeJSON('./output/modTimestamps.json', sortedObj, { spaces: 2 });
  });
};

export default modTimestamps;
