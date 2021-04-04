import { cleanRender, DOWN, ENTER, run, UP } from './load-cmd';

describe('list two aggregates', () => {
  beforeEach(() => {
    cleanRender();
  });
  it('no press', async () => {
    const result = await run([]);
    expect(result).toMatch(/Select aggregate/);
    expect(result).toMatch(/Product \n/);
    expect(result).toMatch(/User/);
  });
});

describe('select first aggregate', () => {
  it('ENTER', async () => {
    const result = await run([ENTER]);
    expect(result).toMatch(/Select aggregate Product/);
  });
  it('DOWN, UP, ENTER', async () => {
    const result = await run([DOWN, UP, ENTER]);
    expect(result).toMatch(/Select aggregate Product/);
  });
  it('DOWN, DOWN, ENTER', async () => {
    const result = await run([DOWN, DOWN, ENTER]);
    expect(result).toMatch(/Select aggregate Product/);
  });
});

describe('select second aggregate', () => {
  test('DOWN, ENTER', async () => {
    const result = await run([DOWN, ENTER]);
    expect(result).toMatch(/Select aggregate User/);
  });
  test('UP, ENTER', async () => {
    const result = await run([UP, ENTER]);
    expect(result).toMatch(/Select aggregate User/);
  });
});
