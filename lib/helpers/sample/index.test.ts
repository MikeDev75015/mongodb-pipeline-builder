import {SizePayload} from "./index";

describe('sample helpers', () => {
    describe('SizePayload', () => {
        test.each([
            [SizePayload(), { size: 1 }],
            [SizePayload(5), { size: 5 }],
        ])('%o should return %o', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
