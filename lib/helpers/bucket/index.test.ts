import {GroupByPayload} from "./index";

describe('bucket helpers', () => {
    describe('GroupByPayload', () => {
        test.each([
            [
                GroupByPayload('$age', [6, 13, 18]),
                { groupBy: '$age', boundaries: [6, 13, 18], default: "Other", output: { "count": { $sum: 1 } } }
            ],
            [
                GroupByPayload('$age', [20, 30], 19, { "ages": { $push: '$age' } }),
                { groupBy: '$age', boundaries: [20, 30], default: 19, output: { "ages": { $push: '$age' } } }
            ],
            [
                GroupByPayload('$age', [6, 13, 18], null),
                { groupBy: '$age', boundaries: [6, 13, 18], output: { "count": { $sum: 1 } } }
            ],
            [
                GroupByPayload('$age', [20, 30], null, null),
                { groupBy: '$age', boundaries: [20, 30] }
            ],
        ])('%o should return %o', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
