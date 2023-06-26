import { rm as fsRm } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';

const rm = async (fileToRemove) => {
  const fileToRemovePath = resolve(cwd(), fileToRemove);
  await fsRm(fileToRemovePath);
};

export default rm;
