import { $BinarySize, $BsonSize } from './index';

const stringOrBinaryData = '021551';
const object = {};

describe('data-size operators', () => {
  test.each([
    [$BinarySize(stringOrBinaryData), { $binarySize: stringOrBinaryData }],
    [$BsonSize(object), { $bsonSize: object }],
  ])('should %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});
