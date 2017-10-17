#!/usr/bin/env node

const csvParse = require('csv-parse/lib/sync');
const csvStringify = require('csv-stringify/lib/sync');
const deepEqual = require('deep-equal');
const detectNewline = require('detect-newline');
const firstline = require('firstline');
const fs = require('fs-extra');
const nops = require('nops');
const stringify = require('json-stable-stringify');
const cli = require('./cli');
const createLogger = require('./create-logger');

async function main(options) {
  const { log, verbose, warn } = createLogger(options);
  let line;

  log('Session starting', options.session);

  verbose('Options', stringify(options, { space: 2 }));

  while (line = await firstline(options.input)) {
    const data = csvParse(line);
    const [url, license] = data[0]
    let hasError = false;

    log('Downloading URL', url);
    log('Using license', license);

    try {
      await nops({
        url,
        license,
        downloadDirectory: options.temp,
        decryptDirectory: options.output,
        verbose: options.verbose,
        dirty: options.dirty
      });

    } catch (error) {
      verbose(error.stack);
      hasError = true;
    }

    const contents = await fs.readFile(options.input, 'utf8');
    const eol = detectNewline(contents) || require('os').EOL;
    const lines = contents.split(eol);

    if (deepEqual(data, csvParse(lines[0]))) {
      verbose('Removing completed job from input file');

      lines.shift();
      await fs.writeFile(options.input, lines.join(eol));
    } else {
      verbose('Ignoring unexpected input file line 1 value');
    }

    const fileType = hasError ? 'failed' : 'complete';
    const fileName = `${options.session}-${fileType}.csv`;
    const message = `Adding the URL and title ID to "${fileName}"`;

    if (hasError) {
      warn('An error has occurred', message);
    } else {
      verbose('Complete', message);
    }

    await fs.appendFile(fileName, csvStringify(data));

    if (!options.next) {
      break;
    }
  }

  log('Session complete', options.session);
}

main(cli).
  then(() => {
    process.exit(0);
  }).
  catch((error) => {
    console.error(`ERROR: ${error.message}`, error.stack);
    process.exit(1);
  });
