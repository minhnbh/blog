const fs = require('fs');
const path = require('path');
const getMultipleLanguage = () => {
  try {
    const pathReadDirI18 = path.resolve(__dirname, 'public', 'i18n');
    const readDirI18 = fs.readdirSync(pathReadDirI18, 'utf8');

    for (const folder of readDirI18) {
      let data = {};
      const pathReadFolderLangs = path.resolve(pathReadDirI18, folder);
      const readDirFolderLangs = fs.readdirSync(pathReadFolderLangs, 'utf8');
      for (const file of readDirFolderLangs) {
        if (file !== 'main.json') {
          const pathReadFileLang = path.resolve(pathReadFolderLangs, file);
          const readDirLangs = JSON.parse(
            fs.readFileSync(pathReadFileLang, 'utf8')
          );
          data = { ...data, ...readDirLangs };
        }
      }
      const pathWriteFile = path.resolve(pathReadFolderLangs, 'main.json');
      fs.writeFileSync(pathWriteFile, JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
  }
};

getMultipleLanguage();
