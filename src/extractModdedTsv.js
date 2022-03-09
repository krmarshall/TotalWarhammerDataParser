import glob from 'glob';
import { exec } from 'child_process';

const cwd = 'D:/GitHub/TotalWarhammerDataParser/rpfm';

const getDirectories = (src, callback) => {
  glob(`${src}**/*`, { nodir: true, ignore: `${src}**/*.tsv` }, callback);
};

const extractModdedTsv = (folder) => {
  return new Promise((resolve, reject) => {
    getDirectories(`./extracted_files/${folder}/`, (error, filePaths) => {
      if (error) {
        reject(error);
      } else {
        const promises = filePaths.map((filePath) => {
          return new Promise((resolveI, rejectI) => {
            exec(`rpfm_cli.exe -g warhammer_2 table -e ".${filePath}"`, { cwd }, (error, stdout, stderr) => {
              if (error) {
                console.log(error);
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
      }
    });
  });
};

export default extractModdedTsv;
