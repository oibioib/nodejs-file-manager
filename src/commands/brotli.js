import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename, parse } from 'path';
import { cwd } from 'process';
import { createBrotliDecompress, createBrotliCompress } from 'zlib';

import { isDirOrFileExist } from '../helpers/helpers.js';

const brotli = async (convertWay, pathToFile, pathToNewDirectory) => {
  try {
    const needCompress = convertWay === 'compress';

    const fileToConvertPath = resolve(cwd(), pathToFile);
    const fileNameWithExtension = basename(fileToConvertPath);
    const fileName = parse(fileNameWithExtension).name;
    const fileNameToWrite = needCompress ? `${fileNameWithExtension}.br` : fileName;

    const dirToWritePath = resolve(cwd(), pathToNewDirectory);
    const fileToWritePath = resolve(dirToWritePath, fileNameToWrite);

    const fileToConvertExist = await isDirOrFileExist(fileToConvertPath);
    if (!fileToConvertExist) throw new Error('File to convert does not exist');

    const isDirToWriteExist = await isDirOrFileExist(dirToWritePath);
    if (!isDirToWriteExist) throw new Error('Directory to convert does not exist');

    const isFileToWriteExist = await isDirOrFileExist(fileToWritePath);
    if (isFileToWriteExist) throw new Error('File to write already exist');

    await new Promise((resolve, reject) => {
      const fileToConvert = createReadStream(fileToConvertPath);
      const fileToWrite = createWriteStream(fileToWritePath, {
        flags: 'wx',
      });

      const brotliTransform = needCompress ? createBrotliCompress() : createBrotliDecompress();

      fileToConvert.pipe(brotliTransform).pipe(fileToWrite);
      fileToConvert.on('error', reject);
      fileToConvert.on('end', resolve);
    });
  } catch (error) {
    throw error;
  }
};

export default brotli;
