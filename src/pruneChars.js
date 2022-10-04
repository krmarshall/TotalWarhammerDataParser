import fg from 'fast-glob';
import fse from 'fs-extra';

const pruneChars = (folder) => {
  const vanillaFolder = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const vanillaCharPaths = fg.sync(`./output/${vanillaFolder}/**/*.json`, { onlyFiles: true });
  const modCharPaths = fg.sync(`./output/${folder}/**/*.json`, { onlyFiles: true });
  modCharPaths.forEach((modCharPath) => {
    const checkVanillaPath = modCharPath.replace(folder, vanillaFolder);
    if (vanillaCharPaths.includes(checkVanillaPath)) {
      fse.removeSync(modCharPath);
    }
  });

  const factionFolders = fg.sync(`./output/${folder}/*/`, { onlyDirectories: true });
  factionFolders.forEach((factionFolder) => {
    fse
      .rmdir(factionFolder)
      .then(() => {})
      .catch((error) => {
        if (error.code === 'ENOTEMPTY') {
          // Folder is not empty, so is not deleted, this is intended
        } else {
          console.log(error);
        }
      });
  });
};

export default pruneChars;
