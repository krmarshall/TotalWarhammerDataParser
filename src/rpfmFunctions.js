import glob from 'glob';
import { emptydirSync } from 'fs-extra';
import { exec } from 'child_process';

const cwd = 'D:/GitHub/TotalWarhammerDataParser/rpfm';

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
              console.log(error);
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
              console.log(error);
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
