import { readFile } from 'fs/promises';
import { resolve, basename } from 'path';
import { cwd } from 'process';
import { createHash } from 'crypto';

import ConsoleMessage from '../lib/colored-message.js';

const hash = async (pathToFile) => {
  const filePath = resolve(cwd(), pathToFile);
  const fileName = basename(filePath);
  const fileBuffer = await readFile(filePath);
  const hash = createHash('sha256').update(fileBuffer).digest('hex');
  ConsoleMessage.white(`${fileName} hash: ${hash}`, hash);
};

export default hash;
