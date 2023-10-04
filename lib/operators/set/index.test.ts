import {
    $AllElementsTrue,
    $AnyElementTrue,
    $SetDifference,
    $SetEquals,
    $SetIntersection,
    $SetIsSubset,
    $SetUnion
} from "./index";

const array: any[] = [];
const array1: any[] = [];
const array2: any[] = [];
const arrayOfArrays = [[2]];


describe('set operators', () => {
    test.each([
        [$AllElementsTrue(array), { $allElementsTrue: [array ] }],
        [$AnyElementTrue(array), { $anyElementTrue: [array ] }],
        [$SetDifference(array1, array2), { $setDifference: [array1, array2 ] }],
        [$SetEquals(...arrayOfArrays), { $setEquals: arrayOfArrays }],
        [$SetIntersection(...arrayOfArrays), { $setIntersection: arrayOfArrays }],
        [$SetIsSubset(array1, array2), { $setIsSubset: [array1, array2 ] }],
        [$SetUnion(...arrayOfArrays), { $setUnion: arrayOfArrays }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});



