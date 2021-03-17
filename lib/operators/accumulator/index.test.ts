import {AddToSet, Avg, Max, Min, Push, StdDevPop, StdDevSamp, Sum} from "./";
const expression = 'toto';

describe('accumulator operators', () => {
    test.each([
        [AddToSet, {$addToSet: expression}],
        [Avg, {$avg: expression}],
        [Max, {$max: expression}],
        [Min, {$min: expression}],
        [Push, {$push: expression}],
        [StdDevPop, {$stdDevPop: expression}],
        [StdDevSamp, {$stdDevSamp: expression}],
        [Sum, {$sum: expression}],
    ])('should %s', (
        operator: any,
        expected: any
    ) => {
        expect(operator(expression)).toEqual(expected);
    });
});
