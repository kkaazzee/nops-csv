const path = require('path');
const pick = require('lodash.pick');
const yargs = require('yargs');
const randomWords = require('random-words');
const { name, version } = require('../package');

const parameters = {
  // Options
  input: {
    alias: 'i',
    default: path.resolve(process.cwd(), 'nops.csv'),
    defaultDescription: '"nops.csv" in the current directory',
    demandOption: true,
    describe: 'A file containing comma separated url and license values',
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
  colorize: {
    alias: 'c',
    default: true,
    describe: 'Enable colored output',
    group: 'Flags:',
    type: 'boolean'
  },
  dirty: {
    alias: 'd',
    default: false,
    describe: 'Disable deletion of downloaded PKG after successful processing',
    group: 'Flags:',
    type: 'boolean'
  },
  next: {
    alias: 'n',
    default: true,
    describe: 'Disable automatically proceeding to the next line in input CSV',
    group: 'Flags:',
    type: 'boolean'
  },
  verbose: {
    alias: 'v',
    default: false,
    describe: 'Enable verbose output to stdout and stderr',
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

module.exports = {
  ...pick(argv, Object.keys(parameters)),
  session: randomWords({ exactly: 2, join: '-' })
};
