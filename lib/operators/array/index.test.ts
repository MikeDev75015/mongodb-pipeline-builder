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

    afterEach(function () {
        jest.clearAllMocks();
    });


    test.each([
        [ArrayElemAt(array, index), { $arrayElemAt: [ array, index ] }],
        [ArrayToObject(literal, array), literal ? ({ $arrayToObject: { $literal: array } }) : ({ $arrayToObject: array })],
        [ArrayToObject(false, array), false ? ({ $arrayToObject: { $literal: array } }) : ({ $arrayToObject: array })],
        [ConcatArrays(...arrayOfArrays), { $concatArrays: arrayOfArrays }],
        [Filter(array, condition, as), { $filter: { input: array, as: as, cond: condition } }],
        [Filter(array, condition), { $filter: { input: array, as: 'this', cond: condition } }],
        [First(array), { $first: array }],
        [In(elementToFind, array), { $in: [ elementToFind, array ] }],
        [IndexOfArray(array, elementToFind, startIndex, endIndex), { $indexOfArray: [ array, elementToFind, startIndex, (endIndex ? endIndex : { $size: array }) ] }],
        [IndexOfArray(array, elementToFind), { $indexOfArray: [ array, elementToFind, 0, (undefined ? endIndex : { $size: array }) ] }],
        [IsArray(elementToVerify), { $isArray: elementToVerify }],
        [Last(array), { $last: array }],
        [MapOperator(array, apply, as), { $map: { input: array, as: as, in: apply } }],
        [MapOperator(array, apply), { $map: { input: array, as: 'this', in: apply } }],
        [ObjectToArray(object), { $objectToArray: object }],
        [Range(startIndex, endIndex, step), { $range: [ startIndex, endIndex, step ] }],
        [Range(startIndex, endIndex), { $range: [ startIndex, endIndex, 1 ] }],
        [Reduce(array, initialValue, apply), { $reduce: { input: array, initialValue: initialValue, in: apply } }],
        [ReverseArray(array), { $reverseArray: array }],
        [Size(array), { $size: array }],
        [Slice(array, numberOfElement, position), { $slice: [ array, position, numberOfElement ] }],
        [Slice(array, numberOfElement), { $slice: [ array, 0, numberOfElement ] }],
        [Zip(arrayOfArrays), {
            $zip: {
                inputs: arrayOfArrays,
                useLongestLength: false,
                defaults:  undefined
            }
        }],
        [Zip(arrayOfArrays, true, defaultArray), {
            $zip: {
                inputs: arrayOfArrays,
                useLongestLength: true,
                defaults: '[]'
            }
        }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
