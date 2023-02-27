import fg from 'fast-glob';
import { exec } from 'child_process';
import fse from 'fs-extra';
import { basename } from 'path';

const cwd = 'D:/GitHub/TotalWarhammerDataParser/rpfm';

const extractData = (folder, dbPackName, tablesString, game, inputFolder = folder) => {
  return new Promise((resolveI, rejectI) => {
    exec(
      `rpfm_cli.exe -g ${game} -p "../game_source/${inputFolder}/${dbPackName}.pack" packfile -E "../extracted_files/${folder}" -${tablesString}`,
      { cwd },
      (error) => {
        if (error) {
          rejectI(error);
        } else {
          resolveI();
        }
      }
    );
  });
};

const extractLoc = (folder, locPackName, locsString, game, inputFolder = folder) => {
  return new Promise((resolveI, rejectI) => {
    exec(
      `rpfm_cli.exe -g ${game} -p "../game_source/${inputFolder}/${locPackName}.pack" packfile -e "../extracted_files/${folder}" -${locsString}`,
      { cwd },
      (error) => {
        if (error) {
          rejectI(error);
        } else {
          resolveI();
        }
      }
    );
  });
};

const extractLocBulk = (folder, locPackName, game, inputFolder = folder) => {
  return new Promise((resolve, reject) => {
    exec(
      `rpfm_cli.exe -g ${game} -p "../game_source/${inputFolder}/${locPackName}.pack" packfile -E "../extracted_files/${folder}" - "text"`,
      { cwd },
      (error) => {
        if (error) {
          reject(error);
        } else {
          // Sometimes mods place locs in /text/ not /text/db/, so move those into db
          const misplacedLocs = fg.sync(`./extracted_files/${folder}/text/*.loc`);
          misplacedLocs.forEach((loc) => {
            const fileName = basename(loc);
            fse.moveSync(loc, `./extracted_files/${folder}/text/db/${fileName}`);
          });

          resolve();
        }
      }
    );
  });
};

const extractPackfileMass = (folder, dbPackName, locPackName, dbList, locList, game) => {
  return new Promise((resolve, reject) => {
    const tablesString = dbList.reduce((prev, cur) => {
      return `${prev} "db/${cur}"`;
    }, '');
    const dataPromise = extractData(folder, dbPackName, tablesString, game);

    // If a locList isnt provided, just extract every loc file, useful for mods, too much data for vanilla games.
    let locPromise;
    if (locList === undefined) {
      locPromise = extractLocBulk(folder, locPackName, game);
    } else {
      const locsString = locList.reduce((prev, cur) => {
        return `${prev} "text/db/${cur}.loc"`;
      }, '');
      locPromise = extractLoc(folder, locPackName, locsString, game);
    }

    Promise.all([dataPromise, locPromise])
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const extractPackfileMulti = (folder, dbPackNames, locPackNames, dbList, locList, game) => {
  return new Promise((resolve, reject) => {
    const tablesString = dbList.reduce((prev, cur) => {
      return `${prev} "db/${cur}"`;
    }, '');

    const dataPromises = dbPackNames.map((dbPackName, index) => {
      fse.ensureDirSync(`./extracted_files/${folder}/subDB${index}`);
      return extractData(folder + `/subDB${index}`, dbPackName, tablesString, game, folder);
    });

    // If a locList isnt provided, just extract every loc file, useful for mods, too much data for vanilla games.
    let locPromises;
    if (locList === undefined) {
      locPromises = locPackNames.map((locPackName, index) => {
        fse.ensureDirSync(`./extracted_files/${folder}/subLOC${index}`);
        return extractLocBulk(folder + `/subLOC${index}`, locPackName, game, folder);
      });
    } else {
      locPromises = locPackNames.map((locPackName, index) => {
        fse.ensureDirSync(`./extracted_files/${folder}/subLOC${index}`);
        if (locList[index].length === 0) {
          return null;
        }
        const locsString = locList[index].reduce((prev, cur) => {
          return `${prev} "text/db/${cur}.loc"`;
        }, '');
        return extractLoc(folder + `/subLOC${index}`, locPackName, locsString, game, folder);
      });
    }

    Promise.all([...dataPromises, ...locPromises])
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const extractTsv = (folder, game) => {
  return new Promise((resolve, reject) => {
    const src = `./extracted_files/${folder}/`;
    const filePaths = fg.sync(`${src}**/*`, { onlyFiles: true, ignore: [`${src}**/*.tsv`, `${src}**/*.png`] });

    const promises = filePaths.map((filePath) => {
      return new Promise((resolveI, rejectI) => {
        exec(`rpfm_cli.exe -g ${game} table -e ".${filePath}"`, { cwd }, (error) => {
          if (error) {
            rejectI(error);
          } else {
            resolveI();
          }
        });
      });
    });
    Promise.all(promises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { extractTsv, extractPackfileMass, extractPackfileMulti };
