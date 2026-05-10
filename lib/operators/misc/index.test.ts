import {
    $CovariancePop,
    $CovarianceSamp,
    $Expression,
    $GetField,
    $Let,
    $Literal,
    $MergeObjects,
    $Meta,
    $Rand,
    $SampleRate,
    $SetField,
} from './';


const functionExpression = () => 'test';
const fieldName = 'name';
const searchedValue = 'toto';
const value = 'test';
const nonNegativeFloat = 1.2;
const metaDataKeyword = 'textScore';
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
        [$Let(vars, functionExpression), { $let: { vars, in: functionExpression } }],
         [$CovariancePop(1, 2), { $covariancePop: [1, 2] }],
         [$CovarianceSamp(2, 1), { $covarianceSamp: [2, 1] }],
         [$GetField('fieldName'), { $getField: { field: 'fieldName' } }],
         [$GetField('fieldName', { input: '$doc' }), { $getField: { field: 'fieldName', input: '$doc' } }],
         [$SetField('fieldName', 'value'), { $setField: { field: 'fieldName', value: 'value' } }],
         [$SetField('fieldName', 'value', { input: '$doc' }), { $setField: { field: 'fieldName', value: 'value', input: '$doc' } }],
    ])('should return %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});

