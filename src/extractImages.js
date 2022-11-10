import fg from 'fast-glob';
import { exec } from 'child_process';
import fse from 'fs-extra';

const cwdRPFM = 'D:/GitHub/TotalWarhammerDataParser/rpfm';
const cwdNconvert = 'D:/GitHub/TotalWarhammerDataParser/bins';

const extractImages = (folder, packNames, game, tech) => {
  return new Promise((resolve, reject) => {
    const imagePromises = packNames.map((packName) => {
      return new Promise((resolveI, rejectI) => {
        let foldersString = '"ui/battle ui/ability_icons" "ui/campaign ui/effect_bundles" "ui/campaign ui/skills"';
        tech ? (foldersString += ' "ui/campaign ui/technologies"') : undefined;
        exec(
          `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${packName}.pack" packfile -E "../extracted_files/${folder}" - ${foldersString}`,
          { cwd: cwdRPFM },
          (error) => {
            if (error) {
              rejectI(error);
            } else {
              resolveI();
            }
          }
        );
      });
    });
    Promise.all(imagePromises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const convertImages = (folder) => {
  const imageDirs = fg.sync(`./extracted_files/${folder}/ui/**/`, { markDirectories: true, onlyDirectories: true });
  const promises = imageDirs.map((imageDir, index) => {
    return new Promise((resolve, reject) => {
      const imagePaths = fg.sync(`${imageDir}*.png`);
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
        exec(`nconvert.exe ./nScripts/${folder}${index}.txt`, { cwd: cwdNconvert, maxBuffer: 5 * 1024 * 1024 }, (error) => {
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
