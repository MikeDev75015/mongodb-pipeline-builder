import {facetPayloadValidator} from "./facet-payload.validator";

describe('facet validators', () => {
    describe('facetPayloadValidator', () => {
        const payloadList: any[] = [
            {},
            { out1: { tests: 'unit' } },
            { out2: [{ $tests: 'unit' }] },
            { out3: [{ $facet: 'unit' }] },
            { out4: [{ $count: 'unit' }] },
        ];
        test.each([
            [facetPayloadValidator(payloadList[0]),
                'You must specify at least one output field with its sub-pipeline.'],
            [facetPayloadValidator(payloadList[1]),
                'The out1 pipeline is not valid.'],
            [facetPayloadValidator(payloadList[2]),
                'The out2 output contains one or more invalid stages.'],
            [facetPayloadValidator(payloadList[3]),
                'The out3 output contains one or more incompatible stages.'],
            [facetPayloadValidator(payloadList[4]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
