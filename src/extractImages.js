import glob from 'glob';
import { exec } from 'child_process';
import { dirname } from 'path';
import { ensureDirSync } from 'fs-extra';

const cwdRPFM = 'D:/GitHub/TotalWarhammerDataParser/rpfm';
const cwdCwebp = 'D:/GitHub/TotalWarhammerDataParser/bins';

const extractImages = (folder, packName, game) => {
  return new Promise((resolve, reject) => {
    console.time(`${folder} images extract`);
    const foldersString = '"ui/battle ui/ability_icons" "ui/campaign ui/effect_bundles" "ui/campaign ui/skills"';
    exec(
      `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${packName}.pack" packfile -E "../extracted_files/${folder}" - ${foldersString}`,
      { cwd: cwdRPFM },
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

const getImagePaths = (src) => {
  return glob.sync(`${src}**/*.png`);
};

// .\cwebp.exe -exact -mt -quiet .\input.png -o .\output.webp
const convertImages = (folder) => {
  const imagePaths = getImagePaths(`./extracted_files/${folder}/ui/`);
  const promises = imagePaths.map((imagePath) => {
    return new Promise((resolve, reject) => {
      const splitPath = imagePath.split(`${folder}/ui/`);
      let outPath = `./output/${folder}/imgs/${splitPath[splitPath.length - 1]}`;
      outPath = outPath.replace('.png', '.webp');
      ensureDirSync(dirname(outPath));
      exec(`cwebp.exe -exact -mt -quiet -q 80 ".${imagePath}" -o ".${outPath}"`, { cwd: cwdCwebp }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
  Promise.all(promises)
    .then(() => {
      console.timeEnd(`${folder} images extract`);
    })
    .catch((error) => {
      throw error;
    });
};

export { extractImages, convertImages };
