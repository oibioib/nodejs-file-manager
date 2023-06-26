import { rename } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';

import { isDirOrFileExist } from '../helpers/helpers.js';

const rn = async (fileToRename, newFilename) => {
  const fileToRenamePath = resolve(cwd(), fileToRename);
  const newFilenamePath = resolve(cwd(), newFilename);

  const isNewFilenameExist = await isDirOrFileExist(newFilenamePath);

  if (isNewFilenameExist) throw new Error('New file already exists');

  await rename(fileToRenamePath, newFilenamePath);
};

export default rn;
