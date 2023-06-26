import { EOL, cpus, homedir, userInfo, arch } from 'os';

import ConsoleMessage from '../lib/colored-message.js';

const os = (param) => {
  switch (param) {
    case '--EOL':
      ConsoleMessage.white(`EOL: ${JSON.stringify(EOL)}`);
      break;
    case '--cpus':
      const cpusInfo = cpus();
      const cpusAmount = cpusInfo.length;
      const cpusInfoFull = cpusInfo.map(({ model, speed }) => {
        return {
          Model: model.trim(),
          Speed: `${speed / 1000} GHz`,
        };
      });
      ConsoleMessage.green(`AMOUNT OF CPUS: ${cpusAmount}`);
      console.table(cpusInfoFull);
      break;
    case '--homedir':
      ConsoleMessage.white(`HOMEDIR: ${homedir()}`);
      break;
    case '--username':
      ConsoleMessage.white(`USERNAME: ${userInfo().username}`);
      break;
    case '--architecture':
      ConsoleMessage.white(`ARCHITECTURE: ${arch}`);
      break;
  }
};

export default os;
