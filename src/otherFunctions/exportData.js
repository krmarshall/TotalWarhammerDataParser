import fse from 'fs-extra';
import log from '../log.js';

const exportData = () => {
  const parserOutputPath = 'D:/GitHub/TotalWarhammerDataParser/output';
  const TWPDataPath = 'D:/GitHub/TWPData';

  fse.emptyDirSync(`${TWPDataPath}/skills`);
  fse.emptyDirSync(`${TWPDataPath}/techs`);

  fse.copySync(parserOutputPath, TWPDataPath);

  log('Data exported', 'green');
};

export default exportData;
