import {DOWN, ENTER, run, UP} from "./load-cmd";

describe('select first aggregate', () => {
    it('ENTER', async () => {
        const result = await run([ENTER]);
        expect(result).toMatch(/Select aggregate Product/);
    });
    it('ENTER', async () => {
        const result = await run([DOWN, UP, ENTER]);
        expect(result).toMatch(/Select aggregate Product/);
    });
    it('ENTER', async () => {
        const result = await run([DOWN, DOWN, ENTER]);
        expect(result).toMatch(/Select aggregate Product/);
    });
})

describe('select second aggregate', () => {
    test('DOWN, ENTER', async () => {
        const result = await run([DOWN, ENTER]);
        expect(result).toMatch(/Select aggregate User/);
    });
    test('DOWN, ENTER', async () => {
        const result = await run([UP, ENTER]);
        expect(result).toMatch(/Select aggregate User/);
    });
})



