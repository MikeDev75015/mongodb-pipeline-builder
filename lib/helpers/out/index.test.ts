import {DbCollPayload} from "./index";

describe('out helpers', () => {
    describe('DbCollPayload', () => {
        test.each([
            [DbCollPayload('unit'), 'unit'],
            [DbCollPayload('unit', 'tests'), { db: 'tests', coll: 'unit'}],
        ])('%o should return %o', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
