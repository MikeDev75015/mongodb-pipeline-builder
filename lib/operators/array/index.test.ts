import {
  $ArrayElementAt,
  $ArrayToObject,
  $ConcatArrays,
  $Filter,
  $First,
  $In,
  $IndexOfArray,
  $IsArray,
  $Last,
  $Map,
  $ObjectToArray,
  $Range,
  $Reduce,
  $ReverseArray,
  $Size,
  $Slice,
  $Zip,
} from './';

const array: any[] = [];
const index = 2;
const condition = false;
const arrayOfArrays = [[2], [3]];
const elementToFind = 'test';
const endIndex = 56;
const elementToVerify = '$test.array';
const apply = () => true;
const initialValue = 'test';
const numberOfElement = 4;
const object = {};
const defaultArray = '$array';

const position = 3;
const step = 2;
const startIndex = 5;
const as = 'test';

describe('array operators', () => {
  test.each([
    [$ArrayElementAt(array, index), { $arrayElemAt: [array, index] }],
    [
      $ArrayToObject(array),
      (
        { $arrayToObject: array }
      ),
    ],
    [
      $ArrayToObject(array, { literal: true }),
      (
        { $arrayToObject: { $literal: array } }
      ),
    ],
    [$ConcatArrays(...arrayOfArrays), { $concatArrays: arrayOfArrays }],
    [$Filter(array, condition, { as }), { $filter: { input: array, as, cond: condition } }],
    [$Filter(array, condition), { $filter: { input: array, cond: condition } }],
    [$First(array), { $first: array }],
    [$In(elementToFind, array), { $in: [elementToFind, array] }],
    [
      $IndexOfArray(array, elementToFind, { startIndex, endIndex }),
      { $indexOfArray: [array, elementToFind, startIndex, endIndex] },
    ],
    [$IndexOfArray(array, elementToFind), { $indexOfArray: [array, elementToFind] }],
    [$IsArray(elementToVerify), { $isArray: elementToVerify }],
    [$Last(array), { $last: array }],
    [$Map(array, apply, { as }), { $map: { input: array, as, in: apply } }],
    [$Map(array, apply), { $map: { input: array, in: apply } }],
    [$ObjectToArray(object), { $objectToArray: object }],
    [$Range(startIndex, endIndex, { step }), { $range: [startIndex, endIndex, step] }],
    [$Range(startIndex, endIndex), { $range: [startIndex, endIndex] }],
    [$Reduce(array, initialValue, apply), { $reduce: { input: array, initialValue, in: apply } }],
    [$ReverseArray(array), { $reverseArray: array }],
    [$Size(array), { $size: array }],
    [$Slice(array, numberOfElement, { position }), { $slice: [array, position, numberOfElement] }],
    [$Slice(array, numberOfElement), { $slice: [array, numberOfElement] }],
    [
      $Zip(arrayOfArrays), {
      $zip: {
        inputs: arrayOfArrays,
      },
    },
    ],
    [
      $Zip(arrayOfArrays, { defaultArray, longestLength: true }), {
      $zip: {
        inputs: arrayOfArrays,
        defaults: defaultArray,
        useLongestLength: true,
      },
    },
    ],
  ])('should %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});
