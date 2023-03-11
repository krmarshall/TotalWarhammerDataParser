import fg from 'fast-glob';
import { exec } from 'child_process';
import fse from 'fs-extra';
import { basename, dirname } from 'path';

const cwd = 'D:/GitHub/TotalWarhammerDataParser/rpfm';

const moveMisplacedLocs = (folder) => {
  // Sometimes mods place locs in /text/ not /text/db/, so move those into db
  const misplacedLocs = fg.sync(`./extracted_files/${folder}/text/*.loc.tsv`);
  misplacedLocs.forEach((loc) => {
    const fileName = basename(loc);
    fse.moveSync(loc, `./extracted_files/${folder}/text/db/${fileName}`);
  });
  const misplacedSubLocs = fg.sync(`./extracted_files/${folder}/subLOC*/text/*.loc.tsv`);
  misplacedSubLocs.forEach((loc) => {
    const fileName = basename(loc);
    const filePath = dirname(loc);
    fse.moveSync(loc, `${filePath}/db/${fileName}`);
  });
};

const extractData = (folder, dbPackName, tablesString, game, inputFolder = folder) => {
  const schema = game.includes('2') ? 'schema_wh2.ron' : 'schema_wh3.ron';
  return new Promise((resolveI, rejectI) => {
    exec(
      `rpfm_cli.exe -g ${game} pack extract -p "../game_source/${inputFolder}/${dbPackName}.pack" -t "./schemas/${schema}" -F ${tablesString}`,
      { cwd },
      (error) => {
        if (error) {
          rejectI(error);
        } else {
          moveMisplacedLocs(inputFolder);
          resolveI();
        }
      }
    );
  });
};

const extractLoc = (folder, locPackName, locsString, game, inputFolder = folder) => {
  const schema = game.includes('2') ? 'schema_wh2.ron' : 'schema_wh3.ron';
  return new Promise((resolveI, rejectI) => {
    exec(
      `rpfm_cli.exe -g ${game} pack extract -p "../game_source/${inputFolder}/${locPackName}.pack" -t "./schemas/${schema}" -f ${locsString}`,
      { cwd },
      (error) => {
        if (error) {
          rejectI(error);
        } else {
          moveMisplacedLocs(inputFolder);
          resolveI();
        }
      }
    );
  });
};

const extractLocBulk = (folder, locPackName, game, inputFolder = folder) => {
  const schema = game.includes('2') ? 'schema_wh2.ron' : 'schema_wh3.ron';
  return new Promise((resolve, reject) => {
    exec(
      `rpfm_cli.exe -g ${game} pack extract -p "../game_source/${inputFolder}/${locPackName}.pack" -t "./schemas/${schema}" -F "/text;../extracted_files/${folder}"`,
      { cwd },
      (error) => {
        if (error) {
          reject(error);
        } else {
          moveMisplacedLocs(inputFolder);
          resolve();
        }
      }
    );
  });
};

const generateTablesString = (dbList, folder) => {
  return dbList.reduce((prev, cur) => {
    return `${prev} "/db/${cur};../extracted_files/${folder}"`;
  }, '');
};

const generateLocsString = (locList, folder) => {
  return locList.reduce((prev, cur) => {
    return `${prev} "/text/db/${cur}.loc;../extracted_files/${folder}"`;
  }, '');
};

const extractPackfileMass = (folder, dbPackName, locPackName, dbList, locList, game) => {
  return new Promise((resolve, reject) => {
    const tablesString = generateTablesString(dbList, folder);

    // If a locList isnt provided, just extract every loc file alongside the dbs, useful for mods, too much data for vanilla games.
    if (locList === undefined && dbPackName === locPackName) {
      extractData(folder, dbPackName, tablesString + ` "/text;../extracted_files/${folder}"`, game)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      const locsString = generateLocsString(locList, folder);
      const locPromise = extractLoc(folder, locPackName, locsString, game);
      const dataPromise = extractData(folder, dbPackName, tablesString, game);

      Promise.all([dataPromise, locPromise])
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

const extractPackfileMulti = (folder, dbPackNames, locPackNames, dbList, locList, game) => {
  return new Promise((resolve, reject) => {
    // If a locList isnt provided, just extract every loc file alongside the dbs, useful for mods, too much data for vanilla games.
    let dataPromises;
    let locPromises;
    if (locList === undefined && JSON.stringify(dbPackNames) === JSON.stringify(locPackNames)) {
      locPromises = locPackNames.map((locPackName, index) => {
        fse.ensureDirSync(`./extracted_files/${folder}/subDB${index}`);
        fse.ensureDirSync(`./extracted_files/${folder}/subLOC${index}`);
        const tablesString = generateTablesString(dbList, folder + `/subDB${index}`);
        return extractData(
          folder + `/subDB${index}`,
          locPackName,
          tablesString + ` "/text;../extracted_files/${folder}/subLOC${index}"`,
          game,
          folder
        );
      });
    } else {
      dataPromises = dbPackNames.map((dbPackName, index) => {
        fse.ensureDirSync(`./extracted_files/${folder}/subDB${index}`);
        const tablesString = generateTablesString(dbList, folder + `/subDB${index}`);
        return extractData(folder + `/subDB${index}`, dbPackName, tablesString, game, folder);
      });

      locPromises = locPackNames.map((locPackName, index) => {
        fse.ensureDirSync(`./extracted_files/${folder}/subLOC${index}`);
        const locsString = generateLocsString(locList, folder + `/subLOC${index}`);
        return extractLoc(folder + `/subLOC${index}`, locPackName, locsString, game, folder);
      });
    }
    const promiseArray = [...locPromises];
    if (dataPromises !== undefined) {
      promiseArray.push(...dataPromises);
    }
    Promise.all(promiseArray)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { extractPackfileMass, extractPackfileMulti };
