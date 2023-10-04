import {$Expression, $Let, $Literal, $MergeObjects, $Meta, $Rand, $SampleRate} from "./";


const expression = 'tot';
const fieldName = 'name';
const searchedValue = 'toto';
const value = 'test';
const nonNegativeFloat = 1.2;
const metaDataKeyword = 'test';
const vars = { var1: 'var1' };
const documents: any[] = [];

const newObject: { [index: string]: any } = {};
newObject[fieldName] = searchedValue;

describe('misc operators', () => {
    test.each([
        [$Expression(value), { $expr: value }],
        [$Literal(value), { $literal: value }],
        [$Rand(), { $rand: {} }],
        [$SampleRate(nonNegativeFloat), { $sampleRate: nonNegativeFloat }],
        [$MergeObjects(...documents), { $mergeObjects: documents }],
        [$Meta(metaDataKeyword), { $meta: metaDataKeyword }],
        [$Let(vars, expression), { $let: { vars, in: expression } }],
    ])('should return %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});

