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

const array = '[]';
const index = 2;
const literal = true;
const condition = false;
const arrayOfArrays = [[2], [3]];
const elementToFind = 'test';
const endIndex = 56;
const elementToVerify = '[]';
const apply = () => true;
const initialValue = 'test';
const numberOfElement = 4;
const object = {};
const defaultArray = '[]';

const position = 3;
const step = 2;
const startIndex = 5;
const as = 'test';

describe('array operators', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    test.each([
        [ArrayElemAt(array, index), { $arrayElemAt: [ array, index ] }],
        [ArrayToObject(literal, array), literal ? ({ $arrayToObject: { $literal: array } }) : ({ $arrayToObject: array })],
        [ArrayToObject(false, array), ({ $arrayToObject: array })],
        [ConcatArrays(...arrayOfArrays), { $concatArrays: arrayOfArrays }],
        [Filter(array, condition, as), { $filter: { input: array, as, cond: condition } }],
        [Filter(array, condition), { $filter: { input: array, as: 'this', cond: condition } }],
        [First(array), { $first: array }],
        [In(elementToFind, array), { $in: [ elementToFind, array ] }],
        [IndexOfArray(array, elementToFind, startIndex, endIndex), { $indexOfArray: [ array, elementToFind, startIndex, endIndex ] }],
        [IndexOfArray(array, elementToFind), { $indexOfArray: [ array, elementToFind, 0, undefined ] }],
        [IsArray(elementToVerify), { $isArray: elementToVerify }],
        [Last(array), { $last: array }],
        [MapOperator(array, apply, as), { $map: { input: array, as, in: apply } }],
        [MapOperator(array, apply), { $map: { input: array, as: 'this', in: apply } }],
        [ObjectToArray(object), { $objectToArray: object }],
        [Range(startIndex, endIndex, step), { $range: [ startIndex, endIndex, step ] }],
        [Range(startIndex, endIndex), { $range: [ startIndex, endIndex, 1 ] }],
        [Reduce(array, initialValue, apply), { $reduce: { input: array, initialValue, in: apply } }],
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
