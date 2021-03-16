// Set Expression Operators
// Set expressions performs set operation on arrays, treating arrays as sets.
// Set expressions ignores the duplicate entries in each input array and the order of the elements.
// If the set operation returns a set, the operation filters out duplicates in the result to output an array that
// contains only unique entries. The order of the elements in the output array is unspecified.
// If a set contains a nested array element, the set expression does not descend into the nested array but evaluates
// the array at top-level.

export const AllElementsTrue = (array: any) => ({ $allElementsTrue: [ array ] });
export const AnyElementTrue = (array: any) => ({ $anyElementTrue: [ array ] });
export const SetDifference = (array1: any, array2: any) => ({ $setDifference: [ array1, array2 ] });
export const SetEquals = (...arrayOfArrays: any) => ({ $setEquals: arrayOfArrays });
export const SetIntersection = (...arrayOfArrays: any) => ({ $setIntersection: arrayOfArrays });
export const SetIsSubset = (array1: any, array2: any) => ({ $setIsSubset: [ array1, array2 ] });
export const SetUnion = (...arrayOfArrays: any) => ({ $setUnion: arrayOfArrays });
