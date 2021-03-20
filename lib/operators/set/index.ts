// Set Expression Operators
// Set expressions performs set operation on arrays, treating arrays as sets.
// Set expressions ignores the duplicate entries in each input array and the order of the elements.
// If the set operation returns a set, the operation filters out duplicates in the result to output an array that
// contains only unique entries. The order of the elements in the output array is unspecified.
// If a set contains a nested array element, the set expression does not descend into the nested array but evaluates
// the array at top-level.

/**
 * Returns true if no element of a set evaluates to false, otherwise, returns false. Accepts a single argument
 * expression.
 * @param array
 * @constructor
 */
export const AllElementsTrue = (array: any) => ({ $allElementsTrue: [ array ] });
/**
 * Returns true if any elements of a set evaluate to true; otherwise, returns false. Accepts a single argument
 * expression.
 * @param array
 * @constructor
 */
export const AnyElementTrue = (array: any) => ({ $anyElementTrue: [ array ] });
/**
 * Returns a set with elements that appear in the first set but not in the second set; i.e. performs a relative
 * complement of the second set relative to the first. Accepts exactly two argument expressions.
 * @param array1
 * @param array2
 * @constructor
 */
export const SetDifference = (array1: any, array2: any) => ({ $setDifference: [ array1, array2 ] });
/**
 * Returns true if the input sets have the same distinct elements. Accepts two or more argument expressions.
 * @param arrayOfArrays
 * @constructor
 */
export const SetEquals = (...arrayOfArrays: any) => ({ $setEquals: arrayOfArrays });
/**
 * Returns a set with elements that appear in all of the input sets. Accepts any number of argument expressions.
 * @param arrayOfArrays
 * @constructor
 */
export const SetIntersection = (...arrayOfArrays: any) => ({ $setIntersection: arrayOfArrays });
/**
 * Returns true if all elements of the first set appear in the second set, including when the first set equals the
 * second set; i.e. not a strict subset. Accepts exactly two argument expressions.
 * @param array1
 * @param array2
 * @constructor
 */
export const SetIsSubset = (array1: any, array2: any) => ({ $setIsSubset: [ array1, array2 ] });
/**
 * Returns a set with elements that appear in any of the input sets.
 * @param arrayOfArrays
 * @constructor
 */
export const SetUnion = (...arrayOfArrays: any) => ({ $setUnion: arrayOfArrays });
