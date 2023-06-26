import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';

const add = async (path) => {
  const filePath = resolve(cwd(), path);
  await writeFile(filePath, '', { flag: 'wx' });
};

export default add;
