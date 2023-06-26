import { createReadStream } from 'fs';
import { resolve as pathResolve } from 'path';
import { cwd } from 'process';

import ConsoleMessage from '../lib/colored-message.js';

const cat = async (path) => {
  await new Promise((resolve, reject) => {
    const filePath = pathResolve(cwd(), path);
    const fileContent = createReadStream(filePath, { encoding: 'utf8' });

    fileContent.on('data', (chunk) => {
      ConsoleMessage.white(chunk);
    });
    fileContent.on('error', reject);
    fileContent.on('end', resolve);
  });
};

export default cat;
