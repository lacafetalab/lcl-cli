var spawn = require('child_process').spawn;
var concat = require('concat-stream');

const cliPath = __dirname + '/../dist/app/index.js';

export function run(combo, timeout: number = 200) {
    var proc = spawn('node', [cliPath], {stdio: [null, null, null]});
    proc.stdin.setEncoding('utf-8');
    var loop = function (combo) {
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
        proc.stdout.pipe(concat(function (result) {
            resolve(result.toString());
        }));
    });
}

export const DOWN = '\x1B\x5B\x42';
export const UP = '\x1B\x5B\x41';
export const ENTER = '\x0D';

/*
test('press enter', async t => {
  const result = await run([cliPath], [ENTER]);
  t.regex(result, new RegExp('TEST-1', 'g'));
});

test('press down, press enter', async t => {
  const result = await run([cliPath], [DOWN, ENTER]);
  t.regex(result, new RegExp('TEST-2', 'g'));
});

test('press up, press enter', async t => {
  const result = await run([cliPath], [UP, ENTER]);
  t.regex(result, new RegExp('TEST-3', 'g'));
});

test('press press up, press down, press enter', async t => {
  const result = await run([cliPath], [UP, DOWN, ENTER]);
  t.regex(result, new RegExp('TEST-1', 'g'));
});

test('run with data input', async t => {
  const result = await run([cliPath], ['input-1', ENTER, 'input-2', ENTER]);
  t.regex(result, new RegExp("username: 'input-1', password: 'input-2'", 'g'));
});
* */