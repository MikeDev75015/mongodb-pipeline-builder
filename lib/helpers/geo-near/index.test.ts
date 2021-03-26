import {NearPayload} from "./index";

describe('NearPayload', () => {
    test.each([
        [NearPayload('tests', 'unit'),
            { near: 'tests', distanceField: 'unit'}],
        [NearPayload('tests', 'unit', { key: 'enter' }),
            { near: 'tests', distanceField: 'unit', key: 'enter' }],
    ])('%o should return %o', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
