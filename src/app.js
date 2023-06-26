import { stdin as input, stdout as output, argv, cwd, chdir } from 'process';
import { EOL, homedir } from 'os';
import * as readline from 'readline/promises';

import ConsoleMessage from './lib/colored-message.js';
import { FILE_MANAGER_ASCII_STRING } from './constants/constants.js';
import { execCommand } from './lib/exec-commands.js';

function App() {
  this._rl;
  this._appUserNameArgvKey = '--username=';
  this._dir = homedir();
  this.userName = 'Stranger';

  this._printAppAsciiTitle = function () {
    ConsoleMessage.yellow(FILE_MANAGER_ASCII_STRING);
  };

  this._getUserNameFromArgv = function () {
    const userNameArgv = argv.slice(2).find((argv) => argv.includes(this._appUserNameArgvKey));

    if (userNameArgv) {
      this.userName = userNameArgv.replace(this._appUserNameArgvKey, '');
    }
  };

  this._printUserWelcomeMessage = function () {
    ConsoleMessage.cyan(`Welcome to the File Manager, ${this.userName}!`);
  };

  this._printUserGoodbyeMessage = function () {
    ConsoleMessage.cyan(`${EOL}Thank you for using File Manager, ${this.userName}, goodbye!${EOL}`);
  };

  this._initReadLine = function () {
    this._rl = readline.createInterface({ input, output });
    this._printCurrentDirWithPrompt();

    this._rl.on('line', async (line) => {
      try {
        await execCommand(line, () => {
          this._rl.close();
        });
      } catch {
        ConsoleMessage.red('Operation failed');
      }

      this._printCurrentDirWithPrompt();
    });

    this._rl.on('close', () => {
      this._printUserGoodbyeMessage();
      process.exit(0);
    });
  };

  this._printCurrentDirWithPrompt = function () {
    this._dir = cwd();
    this._rl.output.write(`${EOL}You are currently in ${this._dir}${EOL}`);
    this._rl.prompt();
  };

  this.start = function () {
    chdir(this._dir);
    this._getUserNameFromArgv();
    this._printAppAsciiTitle();
    this._printUserWelcomeMessage();
    this._initReadLine();
  };
}

export default App;
