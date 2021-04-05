import {GroupByAutoPayload} from "./group-by-auto-payload";

describe('bucket helpers', () => {
    describe('GroupByPayload', () => {
        test.each([
            [
                GroupByAutoPayload('$age', 5),
                { groupBy: '$age', buckets: 5, output: { "count": { $sum: 1 } } }
            ],
            [
                GroupByAutoPayload('$age', 21,
                    { output: { "ages": { $push: '$age' } }, granularity: "R5" }),
                { groupBy: '$age', buckets: 21, output: { "ages": { $push: '$age' } }, granularity: "R5" }
            ],
        ])('%o should return %o', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
