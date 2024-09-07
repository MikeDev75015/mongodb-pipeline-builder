import { $Convert, $IsNumber, $ToBool, $ToDecimal, $ToDouble, $ToInt, $ToLong, $ToObjectId, $Type } from './index';

const input = '';
const to = '';
const onError = '';
const onNull = '';
const expression = '';


describe('type operators', () => {
    test.each([
        [$Convert(input, to, { onError, onNull }), { $convert: { input, to, onError, onNull } }],
        [$Convert(input, to), { $convert: { input, to } }],
        [$IsNumber(expression), { $isNumber: expression }],
        [$ToBool(expression), { $toBool: expression }],
        [$ToDecimal(expression), { $toDecimal: expression }],
        [$ToDouble(expression), { $toDouble: expression }],
        [$ToInt(expression), { $toInt: expression }],
        [$ToLong(expression), { $toLong: expression }],
        [$ToObjectId(expression), { $toObjectId: expression }],
        [$Type(expression), { $type: expression }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});


