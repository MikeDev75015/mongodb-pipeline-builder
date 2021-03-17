import {
    Absolute,
    Add,
    Ceil,
    Divide,
    Exponent,
    Floor,
    Log,
    Log10,
    Mod,
    Multiply,
    NaturalLog,
    Pow,
    Round,
    Sqrt,
    Subtract,
    Trunc
} from "./index";

const
    num = 10,
    place = 5,
    base = 2,
    exponent = 9,
    args: any[] = [],
    dividend = 200,
    divisor = 10,
    expression1 = 200,
    expression2 = 50;

describe('arithmetic operators', () => {
    test.each([
        [Absolute(10), {$abs: 10}],
        [Add(...[]), {$add: []}],
        [Ceil(num), {$ceil: num}],
        [Divide(dividend, divisor), {$divide: [dividend, divisor]}],
        [Exponent(exponent), {$exp: exponent}],
        [Floor(num), {$floor: num}],
        [NaturalLog(num), {$ln: num}],
        [Log(num, base), {$log: [num, base]}],
        [Log10(num), {$log10: num}],
        [Mod(dividend, divisor), {$mod: [dividend, divisor]}],
        [Multiply(...args), {$multiply: args}],
        [Pow(num, exponent), {$pow: [num, exponent]}],
        [Round(num, place), {$round: [num, place]}],
        [Sqrt(num), {$sqrt: num}],
        [Subtract(expression1, expression2), {$subtract: [expression1, expression2]}],
        [Trunc(num, place), {$trunc: [num, place]}]
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
