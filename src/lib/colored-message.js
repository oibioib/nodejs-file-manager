const ConsoleMessage = {
  _colors: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
  },

  _colorReset: '\x1b[0m',

  _printMessage(content, color) {
    console.log(`${color}${content}${this._colorReset}`);
  },

  black(content) {
    this._printMessage(content, this._colors.black);
  },

  red(content) {
    this._printMessage(content, this._colors.red);
  },

  green(content) {
    this._printMessage(content, this._colors.green);
  },

  yellow(content) {
    this._printMessage(content, this._colors.yellow);
  },

  blue(content) {
    this._printMessage(content, this._colors.blue);
  },

  magenta(content) {
    this._printMessage(content, this._colors.magenta);
  },

  cyan(content) {
    this._printMessage(content, this._colors.cyan);
  },

  white(content) {
    this._printMessage(content, this._colors.white);
  },

  gray(content) {
    this._printMessage(content, this._colors.gray);
  },
};

export default ConsoleMessage;
