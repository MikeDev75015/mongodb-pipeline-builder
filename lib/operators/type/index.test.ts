import {Convert, IsNumber, ToBool, ToDecimal, ToDouble, ToInt, ToLong, ToObjectId, Type} from "./index";

const
    input = '',
    to = '',
    onError = '',
    onNull = '',
    expression = '';


describe('type operators', () => {
    test.each([
        [Convert(input, to, onError, onNull), { $convert: {input: input, to: to, onError: onError, onNull: onNull} }],
        [IsNumber(expression), { $isNumber: expression }],
        [ToBool(expression), { $toBool: expression }],
        [ToDecimal(expression), { $toDecimal: expression }],
        [ToDouble(expression), { $toDouble: expression }],
        [ToInt(expression), { $toInt: expression }],
        [ToLong(expression), { $toLong: expression }],
        [ToObjectId(expression), { $toObjectId: expression }],
        [Type(expression), { $type: expression }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});


