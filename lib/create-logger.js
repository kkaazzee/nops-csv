const chalk = require('chalk');
const { name } = require('../package');

module.exports = function createLogger(options) {
  const { colorize, verbose } = options;
  const context = new chalk.constructor({ enabled: colorize });
  const prefix = verbose ? `${name} ` : '';

  function log(title, args, titleColor = context.white, argsColor = context.white) {
    const suffix = args.length ? ':' : '';

    console.log(
      titleColor(`${prefix}${title}${suffix}`),
      argsColor(...args)
    );
  }

  return {
    log(title, ...args) {
      log(title, args, context.cyan);
    },
    success(title, ...args) {
      log(title, args, context.green, context.green);
    },
    verbose(title, ...args) {
      verbose && log(title, args, context.gray, context.gray);
    },
    warn(title, ...args) {
      log(title, args, context.red, context.red);
    }
  }
};
