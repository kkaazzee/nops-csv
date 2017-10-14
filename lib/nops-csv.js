const path = require('path');
const yargs = require('yargs');
const randomWords = require('random-words');
const stringify = require('json-stable-stringify');
const pick = require('lodash.pick');
const { name, version } = require('../package');

async function main(input) {
  input.verbose && console.log('Input:', stringify(input, { space: 2 }));
}

const parameters = {
  // Options
  input: {
    alias: 'i',
    default: path.join(process.cwd(), 'nops.csv'),
    defaultDescription: '"nops.csv" in the current directory',
    demandOption: true,
    describe: 'A file containing comma separated title ID and URL values',
    group: 'Options:',
    requiresArg: true,
    type: 'string'
  },
  output: {
    alias: 'o',
    default: process.cwd(),
    defaultDescription: 'current directory',
    demandOption: true,
    describe: 'The directory where PKG contents are extracted',
    group: 'Options:',
    requiresArg: true,
    type: 'string'
  },
  temp: {
    alias: 't',
    default: process.cwd(),
    defaultDescription: 'current directory',
    demandOption: true,
    describe: 'The directory where PKG files are temporarily stored',
    group: 'Options:',
    requiresArg: true,
    type: 'string'
  },

  // Flags
  verbose: {
    alias: 'v',
    default: false,
    describe: 'Enable verbose output to stdout and stderr',
    group: 'Flags:',
    type: 'boolean'
  },
  dirty: {
    alias: 'd',
    default: false,
    describe: 'Disable deletion of downloaded PKG after successful decryption and extraction',
    group: 'Flags:',
    type: 'boolean'
  },

  // General
  help: {
    alias: 'h',
    group: 'General:'
  },
  version: {
    group: 'General:'
  }
}

const argv = yargs.
  usage(`Usage: ${name} [options] [flags]`).
  options(parameters).
  version(version).
  argv;

const input = {
  ...pick(argv, Object.keys(parameters)),
  session: randomWords({ exactly: 2, join: '-' })
};

main(input).
  then(() => {
    process.exit(0);
  }).
  catch((error) => {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  });
