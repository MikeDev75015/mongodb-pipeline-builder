import {
    $Acos,
    $Acosh,
    $Asin,
    $Asinh, $Atan,
    $Atan2,
    $Atanh,
    $Cos,
    $Cosh,
    $DegreesToRadians,
    $RadiansToDegrees,
    $Sin,
    $Sinh,
    $Tan,
    $Tanh
} from "./index";

const expression = 'unit';
const expression1 = 'tests';
const expression2 = 'again';


describe('trigonometry operators', () => {
    test.each([
        [$Sin(expression), { $sin: expression }],
        [$Cos(expression), { $cos: expression }],
        [$Tan(expression), { $tan: expression }],
        [$Asin(expression), { $asin: expression }],
        [$Acos(expression), { $acos: expression }],
        [$Atan(expression), { $atan: expression }],
        [$Atan2(expression1, expression2), { $atan2: [expression1, expression2 ] }],
        [$Asinh(expression), { $asinh: expression }],
        [$Acosh(expression), { $acosh: expression }],
        [$Atanh(expression), { $atanh: expression }],
        [$Sinh(expression), { $sinh: expression }],
        [$Cosh(expression), { $cosh: expression }],
        [$Tanh(expression), { $tanh: expression }],
        [$DegreesToRadians(expression), { $degreesToRadians: expression }],
        [$RadiansToDegrees(expression), { $radiansToDegrees: expression }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});

