import {BucketAutoGroupByHelper} from "./bucket-auto-group-by.helper";

describe('bucket helpers', () => {
    describe('BucketGroupByHelper', () => {
        test.each([
            [
              BucketAutoGroupByHelper('$age', 5),
                { groupBy: '$age', buckets: 5, output: { "count": { $sum: 1 } } }
            ],
            [
              BucketAutoGroupByHelper('$age', 21,
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
