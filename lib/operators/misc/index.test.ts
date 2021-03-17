import {Expression, Field, Let, Literal, MergeObjects, Meta, Rand, SampleRate} from "./";


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
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
