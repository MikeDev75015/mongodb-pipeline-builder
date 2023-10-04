import {UnionWithCollectionHelper} from "./union-with-collection.helper";

describe('unionWith helpers', () => {
    test.each([
        [UnionWithCollectionHelper('cars'), { coll: 'cars', pipeline: [] }],
        [UnionWithCollectionHelper('collection', [
            { $match: { test: 'unit' } }
        ]), { coll: 'collection', pipeline: [{ $match: { test: 'unit' } }] }],
    ])('%o should return %o', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
