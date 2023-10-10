import {
    $ArcCosine,
    $ArcCosineHyperbolic,
    $ArcSine,
    $ArcSineHyperbolic, $ArcTangent,
    $ArcTangent2,
    $ArcTangentHyperbolic,
    $Cosine,
    $CosineHyperbolic,
    $DegreesToRadians,
    $RadiansToDegrees,
    $Sin,
    $Sinh,
    $Tan,
    $Tanh
} from "./index";

const expression = '$unit.value';
const expression1 = 1;
const expression2 = { $max: [1, '$unit.value'] };


describe('trigonometry operators', () => {
    test.each([
        [$Sin(expression), { $sin: expression }],
        [$Cosine(expression), { $cos: expression }],
        [$Tan(expression), { $tan: expression }],
        [$ArcSine(expression), { $asin: expression }],
        [$ArcCosine(expression), { $acos: expression }],
        [$ArcTangent(expression), { $atan: expression }],
        [$ArcTangent2(expression1, expression2), { $atan2: [expression1, expression2 ] }],
        [$ArcSineHyperbolic(expression), { $asinh: expression }],
        [$ArcCosineHyperbolic(expression), { $acosh: expression }],
        [$ArcTangentHyperbolic(expression), { $atanh: expression }],
        [$Sinh(expression), { $sinh: expression }],
        [$CosineHyperbolic(expression), { $cosh: expression }],
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

