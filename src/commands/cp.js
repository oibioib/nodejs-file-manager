import { createReadStream, createWriteStream } from 'fs';
import { resolve as pathResolve, basename } from 'path';
import { cwd } from 'process';

import { isDirOrFileExist } from '../helpers/helpers.js';

const cp = async (pathToFile, pathToNewDirectory) => {
  try {
    const fileToCopyPath = pathResolve(cwd(), pathToFile);
    const fileName = basename(fileToCopyPath);
    const dirToWritePath = pathResolve(cwd(), pathToNewDirectory);
    const fileToWritePath = pathResolve(dirToWritePath, fileName);

    const isFileToCopyExist = await isDirOrFileExist(fileToCopyPath);
    if (!isFileToCopyExist) throw new Error('File to copy does not exist');

    const isDirToWriteExist = await isDirOrFileExist(dirToWritePath);
    if (!isDirToWriteExist) throw new Error('Directory to copy does not exist');

    const isFileToWriteExist = await isDirOrFileExist(fileToWritePath);
    if (isFileToWriteExist) throw new Error('File to write already exist');

    await new Promise(async (resolve, reject) => {
      const fileToCopy = createReadStream(fileToCopyPath, { encoding: 'utf8' });
      const fileToWrite = createWriteStream(fileToWritePath, {
        flags: 'wx',
      });

      fileToCopy.pipe(fileToWrite);
      fileToCopy.on('error', reject);
      fileToCopy.on('end', resolve);
    });
  } catch (error) {
    throw error;
  }
};

export default cp;
