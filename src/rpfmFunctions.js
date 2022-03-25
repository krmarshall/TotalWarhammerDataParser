import glob from 'glob';
import { emptydirSync } from 'fs-extra';
import { existsSync } from 'fs';
import { exec } from 'child_process';

const cwd = 'D:/GitHub/TotalWarhammerDataParser/rpfm';

const assertTables = (folder, dbList, locList) => {
  const missingTables = [];
  dbList.forEach((table) => {
    if (!existsSync(`./extracted_files/${folder}/db/${table}`)) {
      missingTables.push(table);
    }
  });
  locList.forEach((table) => {
    if (!existsSync(`./extracted_files/${folder}/text/db/${table}.loc`)) {
      missingTables.push(table);
    }
  });
  return missingTables;
};

const extractPackfile = (folder, dbPackName, locPackName, dbList, locList, game) => {
  console.time(`${folder} extract`);
  emptydirSync(`./extracted_files/${folder}/`);
  return new Promise((resolve, reject) => {
    const dataPromises = dbList.map((table) => {
      return new Promise((resolveI, rejectI) => {
        exec(
          `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${dbPackName}.pack" packfile -E "../extracted_files/${folder}" - "db/${table}"`,
          { cwd },
          (error, stdout, stderr) => {
            if (error) {
              rejectI(error);
            } else {
              resolveI();
            }
          }
        );
      });
    });
    const locPromises = locList.map((table) => {
      return new Promise((resolveI, rejectI) => {
        exec(
          `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${locPackName}.pack" packfile -e "../extracted_files/${folder}" - "text/db/${table}.loc"`,
          { cwd },
          (error, stdout, stderr) => {
            if (error) {
              rejectI(error);
            } else {
              resolveI();
            }
          }
        );
      });
    });
    const allPromises = [...dataPromises, ...locPromises];
    Promise.all(allPromises)
      .then(() => {
        console.timeEnd(`${folder} extract`);
        const missingTables = assertTables(folder, dbList, locList);
        if (missingTables.length > 0) {
          console.log(`${folder} missing tables: ${missingTables}`);
        }
        resolve();
      })
      .catch((error) => {
        console.timeEnd(`${folder} extract`);
        reject(error);
      });
  });
};

const getDirectories = (src, callback) => {
  glob(`${src}**/*`, { nodir: true, ignore: `${src}**/*.tsv` }, callback);
};

const extractTsv = (folder, game) => {
  console.time(`${folder} tsv`);
  return new Promise((resolve, reject) => {
    getDirectories(`./extracted_files/${folder}/`, (error, filePaths) => {
      if (error) {
        reject(error);
      } else {
        const promises = filePaths.map((filePath) => {
          return new Promise((resolveI, rejectI) => {
            exec(`rpfm_cli.exe -g ${game} table -e ".${filePath}"`, { cwd }, (error, stdout, stderr) => {
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
            console.timeEnd(`${folder} tsv`);
            resolve();
          })
          .catch((error) => {
            console.timeEnd(`${folder} tsv`);
            reject(error);
          });
      }
    });
  });
};

export { extractPackfile, extractTsv };