import { cleanRender, DOWN, ENTER, run } from './load-cmd';

describe('select aggregate User', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('>user', async () => {
    const result = await run([DOWN, ENTER]);
    expect(result).toMatch(/Select aggregate User/);
    expect(result).toMatch(/What do you want to generate in User/);
    expect(result).toMatch(/Create Service Command/);
    expect(result).toMatch(/Create Service Query/);
    expect(result).toMatch(/Create Event/);
    expect(result).toMatch(/Generate Core/);
  });
});

describe('select one item in menu User', () => {
  test('select 1) Create Service Command', async () => {
    const result = await run([DOWN, ENTER, ENTER]);
    expect(result).toMatch(/Select aggregate User/);
    expect(result).toMatch(/What do you want to generate in User\? Create Service Command/);
  });
  test('select 2) Create Service Query', async () => {
    const result = await run([DOWN, ENTER, DOWN, ENTER]);
    expect(result).toMatch(/Select aggregate User/);
    expect(result).toMatch(/What do you want to generate in User\? Create Service Query/);
  });
  test('select 3) Create Event', async () => {
    const result = await run([DOWN, ENTER, DOWN, DOWN, ENTER]);
    expect(result).toMatch(/Select aggregate User/);
    expect(result).toMatch(/What do you want to generate in User\? Create Event/);
  });
  test('select 4) Generate Core', async () => {
    const result = await run([DOWN, ENTER, DOWN, DOWN, DOWN, ENTER]);
    expect(result).toMatch(/Select aggregate User/);
    expect(result).toMatch(/What do you want to generate in User\? Generate Core/);
  });
});
