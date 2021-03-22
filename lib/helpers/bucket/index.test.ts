import {GroupByPayload} from "./index";

describe('bucket helpers', () => {
    describe('GroupByPayload', () => {
        test.each([
            [
                GroupByPayload('$age', [6, 13, 18]),
                { groupBy: '$age', boundaries: [6, 13, 18], output: { "count": { $sum: 1 } } }
            ],
            [
                GroupByPayload('$age', [20, 30],
                    { output: { "ages": { $push: '$age' } }, default: 'test' }),
                { groupBy: '$age', boundaries: [20, 30], default: 'test', output: { "ages": { $push: '$age' } } }
            ],
        ])('%o should return %o', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
