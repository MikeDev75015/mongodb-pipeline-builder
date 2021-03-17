import {
    ArrayElemAt,
    ArrayToObject, ConcatArrays,
    Filter,
    First,
    In, IndexOfArray,
    IsArray,
    Last, MapOperator,
    ObjectToArray,
    Range,
    Reduce,
    ReverseArray,
    Size, Slice,
    Zip
} from "./";

const
    array = '[]',
    index = 2,
    literal = true,
    condition = false,
    arrayOfArrays = [[2], [3]],
    elementToFind = 'test',
    endIndex = 56,
    elementToVerify = '[]',
    apply = () => true,
    initialValue = 'test',
    numberOfElement = 4,
    object = {},
    defaultArray = '[]';

let
    position = 3,
    longestLength = false,
    step = 2,
    startIndex = 5,
    as = 'test';

describe('array operators', () => {
    test.each([
    [ArrayElemAt(array, index), { $arrayElemAt: [ array, index ] }],
    [ArrayToObject(literal, array), literal ? ({ $arrayToObject: { $literal: array } }) : ({ $arrayToObject: array })],
    [ConcatArrays(...arrayOfArrays), { $concatArrays: arrayOfArrays }],
    [Filter(array, condition, as = 'this'), { $filter: { input: array, as: as, cond: condition } }],
    [First(array), { $first: array }],
    [In(elementToFind, array), { $in: [ elementToFind, array ] }],
    [IndexOfArray(array, elementToFind, startIndex = 0, endIndex), { $indexOfArray: [ array, elementToFind, startIndex, (endIndex ? endIndex : { $size: array }) ] }],
    [IsArray(elementToVerify), { $isArray: elementToVerify }],
    [Last(array), { $last: array }],
    [MapOperator(array, apply, as = 'this'), { $map: { input: array, as: as, in: apply } }],
    [ObjectToArray(object), { $objectToArray: object }],
    [Range(startIndex, endIndex, step = 1), { $range: [ startIndex, endIndex, step ] }],
    [Reduce(array, initialValue, apply), { $reduce: { input: array, initialValue: initialValue, in: apply } }],
    [ReverseArray(array), { $reverseArray: array }],
    [Size(array), { $size: array }],
    [Slice(array, numberOfElement, position = 0), { $slice: [ array, position, numberOfElement ] }],
    [Zip(arrayOfArrays, longestLength = false, defaultArray), {
        $zip: {
            inputs: arrayOfArrays,
            useLongestLength: longestLength,
            defaults:  defaultArray
        }
    }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
