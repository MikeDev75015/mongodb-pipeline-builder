// Data $Size Operators
// The following operators return the size of a data element:

/**
 * Returns the size of a given string or binary data value’s content in bytes.
 *
 * The argument for $binarySize must resolve to either:
 * - A string,
 * - A binary data value, or
 * - null.
 *
 * If the argument is a string or binary data value, the expression returns the size of the argument in bytes.
 * If the argument is null, the expression returns null.
 * If the argument resolves to any other data type, $binarySize errors.
 *
 * @param stringOrBinaryData can be any valid expression as long as it resolves to either a string or binary data value.
 * @constructor
 */
export const $BinarySize = (stringOrBinaryData: any) => ({ $binarySize: stringOrBinaryData });
/**
 * Returns the size in bytes of a given document (i.e. bsontype Object) when encoded as BSON. You can use $bsonSize as
 * an alternative to the Object.bsonSize() method.
 *
 * If the argument is an object, the expression returns the size of the object in bytes when the object is encoded as
 * BSON.
 * If the argument is null, the expression returns null.
 * If the argument resolves to a data type other than an object or null, $bsonSize errors.
 *
 * @param object
 * @constructor
 */
export const $BsonSize = (object: any) => ({ $bsonSize: object });
