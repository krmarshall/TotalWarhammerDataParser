import glob from 'glob';
import { exec } from 'child_process';
import fse from 'fs-extra';

const cwdRPFM = 'D:/GitHub/TotalWarhammerDataParser/rpfm';
const cwdNconvert = 'D:/GitHub/TotalWarhammerDataParser/bins';

const extractImages = (folder, packName, game) => {
  return new Promise((resolve, reject) => {
    const foldersString = '"ui/battle ui/ability_icons" "ui/campaign ui/effect_bundles" "ui/campaign ui/skills"';
    exec(
      `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${packName}.pack" packfile -E "../extracted_files/${folder}" - ${foldersString}`,
      { cwd: cwdRPFM },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

const getImageDirs = (src) => {
  return glob.sync(`${src}**/`);
};

const getImagePaths = (src) => {
  return glob.sync(`${src}*.png`);
};

const convertImages = (folder) => {
  const imageDirs = getImageDirs(`./extracted_files/${folder}/ui/`);
  const promises = imageDirs.map((imageDir, index) => {
    return new Promise((resolve, reject) => {
      const imagePaths = getImagePaths(imageDir);
      if (imagePaths.length === 0) {
        resolve();
      } else {
        const splitPath = imageDir.split(`${folder}/ui/`);
        let outPath = `../output_img/${folder}/${splitPath[splitPath.length - 1]}`;
        outPath = outPath.replace(' ', '_');
        // ensureDirSync(outPath);
        const script = `### -out webp -q 90 -rmeta -quiet -o ${outPath}%`;
        const finalScript = imagePaths.reduce((prev, cur) => {
          return `${prev}\n.${cur}`;
        }, script);
        fse.outputFileSync(`./bins/nScripts/${folder}${index}.txt`, finalScript);
        exec(`nconvert.exe ./nScripts/${folder}${index}.txt`, { cwd: cwdNconvert }, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { extractImages, convertImages };
