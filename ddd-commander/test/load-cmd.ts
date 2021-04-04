import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spawn = require('child_process').spawn;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const concat = require('concat-stream');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rimraf = require('rimraf');

const cliPath = __dirname + '/../dist/app/index.js';
const renderPath = __dirname + '/../render';

export function cleanRender() {
  rimraf.sync(renderPath);
}

export function readRender(pathRender: string): string {
  return fs.readFileSync(path.join(renderPath, pathRender), 'utf-8');
}

export function run(combo, timeout = 200) {
  const proc = spawn('node', [cliPath], { stdio: [null, null, null] });
  proc.stdin.setEncoding('utf-8');
  const loop = function (combo) {
    if (combo.length > 0) {
      setTimeout(function () {
        proc.stdin.write(combo[0]);
        loop(combo.slice(1));
      }, timeout);
    } else {
      proc.stdin.end();
    }
  };
  loop(combo);
  return new Promise(function (resolve) {
    proc.stdout.pipe(
      concat(function (result) {
        resolve(result.toString());
      }),
    );
  });
}

export const DOWN = '\x1B\x5B\x42';
export const UP = '\x1B\x5B\x41';
export const ENTER = '\x0D';
