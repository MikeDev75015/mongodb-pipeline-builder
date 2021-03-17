import {Expression, Field, Ignore, Let, Literal, MergeObjects, Meta, Only, Rand, SampleRate} from "./";


const
    expression = 'tot',
    fieldName = 'name',
    searchedValue = 'toto',
    value = 'test',
    nonNegativeFloat = 1.2,
    metaDataKeyword = 'test',
    vars = { var1: 'var1'},
    documents: any[] = [];

let newObject: {// @ts-ignore
    [index: string]} = {};
newObject[fieldName] = searchedValue;

describe('misc operators', () => {
    test.each([
        [Expression(expression), { $expr: expression }],
        [Field(fieldName, searchedValue), newObject],
        [Literal(value), { $literal: value }],
        [Rand(), { $rand: {} }],
        [SampleRate(nonNegativeFloat), { $sampleRate: nonNegativeFloat }],
        [MergeObjects(...documents), { $mergeObjects: documents }],
        [Meta(metaDataKeyword), { $meta: metaDataKeyword }],
        [Let(vars, expression), { $let: { vars: vars, in: expression } }],
        [Only('test', 'test2'), { test: 1, test2: 1 }],
        [Ignore('test', 'test2'), { test: 0, test2: 0 }],
    ])('should return %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});

