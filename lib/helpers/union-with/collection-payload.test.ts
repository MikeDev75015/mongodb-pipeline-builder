import {CollectionPayload} from "./collection-payload";

describe('unionWith helpers', () => {
    test.each([
        [CollectionPayload('cars'), { coll: 'cars', pipeline: [] }],
        [CollectionPayload('collection', [
            { $match: { test: 'unit' } }
        ]), { coll: 'collection', pipeline: [{ $match: { test: 'unit' } }] }],
    ])('%o should return %o', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
