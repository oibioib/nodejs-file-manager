import ConsoleMessage from './colored-message.js';

import cd from '../commands/cd.js';
import ls from '../commands/ls.js';
import up from '../commands/up.js';
import cat from '../commands/cat.js';
import add from '../commands/add.js';
import rn from '../commands/rn.js';
import cp from '../commands/cp.js';
import rm from '../commands/rm.js';
import mv from '../commands/mv.js';
import os from '../commands/os.js';
import hash from '../commands/hash.js';
import brotli from '../commands/brotli.js';

const commandsArgs = {
  '.exit': {
    paramsCount: 0,
    params: [],
    needValidateParam: false,
  },
  ls: {
    paramsCount: 0,
    params: [],
    needValidateParam: false,
  },
  os: {
    paramsCount: 1,
    params: ['--EOL', '--cpus', '--homedir', '--username', '--architecture'],
    needValidateParam: true,
  },
  up: {
    paramsCount: 0,
    params: [],
    needValidateParam: false,
  },
  cd: {
    paramsCount: 1,
    params: [],
    needValidateParam: false,
  },
  cat: {
    paramsCount: 1,
    params: [],
    needValidateParam: false,
  },
  add: {
    paramsCount: 1,
    params: [],
    needValidateParam: false,
  },
  rn: {
    paramsCount: 2,
    params: [],
    needValidateParam: false,
  },
  cp: {
    paramsCount: 2,
    params: [],
    needValidateParam: false,
  },
  rm: {
    paramsCount: 1,
    params: [],
    needValidateParam: false,
  },
  mv: {
    paramsCount: 2,
    params: [],
    needValidateParam: false,
  },
  hash: {
    paramsCount: 1,
    params: [],
    needValidateParam: false,
  },
  compress: {
    paramsCount: 2,
    params: [],
    needValidateParam: false,
  },
  decompress: {
    paramsCount: 2,
    params: [],
    needValidateParam: false,
  },
};

const isCommandAndParamsValid = (command, params) => {
  if (!(command in commandsArgs)) return false;
  if (commandsArgs[command].paramsCount !== params.length) return false;
  if (
    commandsArgs[command].needValidateParam &&
    commandsArgs[command].params.filter((commandParam) => params.includes(commandParam)).length !==
      params.length
  )
    return false;

  return true;
};

const separateParams = (paramsLine) => {
  let params = [];

  const lineTrimmed = paramsLine.trim();

  if (!lineTrimmed.length) return params;

  const firstSymbol = lineTrimmed.slice(0, 1);

  if (firstSymbol === "'" || firstSymbol === '"') {
    const paramEnd = lineTrimmed.indexOf(firstSymbol, 1);

    if (paramEnd === -1) {
      throw new Error('Invalid param');
    }

    const param = lineTrimmed.slice(1, paramEnd);

    if (param.includes('"') || param.includes("'")) {
      throw new Error('Invalid param');
    }

    const rest = lineTrimmed.slice(paramEnd + 1);
    params.push(param, ...separateParams(rest));
  } else {
    const [param] = lineTrimmed.split(' ');

    if (param.includes('"') || param.includes("'")) {
      throw new Error('Invalid param');
    }

    params.push(param, ...separateParams(lineTrimmed.slice(param.length)));
  }

  return params;
};

const parseCommandAndParams = (line) => {
  const lineTrimmed = line.trim();
  const [command] = lineTrimmed.split(' ');
  let paramsLine = lineTrimmed.slice(command.length).trim();

  try {
    const params = [...separateParams(paramsLine)];
    return { command, params };
  } catch {
    return { command, params: [] };
  }
};

export const execCommand = async (line, rlClose) => {
  const { command, params } = parseCommandAndParams(line);

  if (!isCommandAndParamsValid(command, params)) {
    ConsoleMessage.red(`Invalid input`);
    return;
  }

  if (command === '.exit') {
    rlClose();
    return;
  }

  switch (command) {
    case 'ls':
      await ls();
      break;
    case 'os':
      os(...params);
      break;
    case 'up':
      up();
      break;
    case 'cd':
      cd(...params);
      break;
    case 'cat':
      await cat(...params);
      break;
    case 'add':
      await add(...params);
      break;
    case 'rn':
      await rn(...params);
      break;
    case 'cp':
      await cp(...params);
      break;
    case 'rm':
      await rm(...params);
      break;
    case 'mv':
      await mv(...params);
      break;
    case 'hash':
      await hash(...params);
      break;
    case 'compress':
      await brotli('compress', ...params);
      break;
    case 'decompress':
      await brotli('decompress', ...params);
      break;
  }
};
