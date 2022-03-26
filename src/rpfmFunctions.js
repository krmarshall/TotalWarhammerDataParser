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

const extractPackfileMass = (folder, dbPackName, locPackName, dbList, locList, game) => {
  console.time(`${folder} mass extract`);
  emptydirSync(`./extracted_files/${folder}/`);
  return new Promise((resolve, reject) => {
    const tablesString = dbList.reduce((prev, cur) => {
      return `${prev} "db/${cur}"`;
    }, '');

    const dataPromise = new Promise((resolveI, rejectI) => {
      exec(
        `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${dbPackName}.pack" packfile -E "../extracted_files/${folder}" -${tablesString}`,
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

    const locsString = locList.reduce((prev, cur) => {
      return `${prev} "text/db/${cur}.loc"`;
    }, '');

    const locPromise = new Promise((resolveI, rejectI) => {
      exec(
        `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${locPackName}.pack" packfile -e "../extracted_files/${folder}" -${locsString}`,
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

    Promise.all([dataPromise, locPromise])
      .then(() => {
        console.timeEnd(`${folder} mass extract`);
        const missingTables = assertTables(folder, dbList, locList);
        if (missingTables.length > 0) {
          console.log('\x1b[33m', `\b${folder} missing tables: ${missingTables}`, '\x1b[0m');
        }
        resolve();
      })
      .catch((error) => {
        console.timeEnd(`${folder} mass extract`);
        reject(error);
      });
  });
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
          console.log('\x1b[33m', `\b${folder} missing tables: ${missingTables}`, '\x1b[0m');
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

// const extractTsvMass = (folder, game) => {
//   console.time(`${folder} mass tsv`);
//   return new Promise((resolve, reject) => {
//     getDirectories(`./extracted_files/${folder}/`, (error, filePaths) => {
//       if (error) {
//         reject(error);
//       } else {
//         const filePathsString = filePaths.reduce((prev, cur) => {
//           return `${prev} ".${cur}"`;
//         }, '');

//         exec(`rpfm_cli.exe -g ${game} table -e${filePathsString}`, { cwd }, (error, stdout, stderr) => {
//           if (error) {
//             console.timeEnd(`${folder} mass tsv`);
//             reject(error);
//           } else {
//             console.timeEnd(`${folder} mass tsv`);
//             resolve();
//           }
//         });
//       }
//     });
//   });
// };

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

export { extractPackfile, extractTsv, extractPackfileMass };
