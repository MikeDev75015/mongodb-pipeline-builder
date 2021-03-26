import {facetPayloadValidator} from "./facet-payload.validator";

describe('facet validators', () => {
    describe('facetPayloadValidator', () => {
        const payloadList: any[] = [
            {},
            { out1: { tests: 'unit' } },
            { out1multi1: { tests: 'unit' }, out1multi2: { tests: 'unit' } },
            { out2: [{ $tests: 'unit' }] },
            { out2multi1: [{ $tests: 'unit' }, { $name: 'toto' }], out2multi2: [{ $tests: 'unit' }] },
            { out3: [{ $facet: 'unit' }] },
            { out3multi1: [{ $facet: 'unit' }], out3multi2: [{ $merge: 'unit' }] },
            { out4: [{ $count: 'unit' }] },
        ];
        test.each([
            [facetPayloadValidator(payloadList[0]),
                'You must specify at least one output field with its sub-pipeline.'],
            [facetPayloadValidator(payloadList[1]),
                'The out1 pipeline is not valid.'],
            [facetPayloadValidator(payloadList[2]),
                'The out1multi1 / out1multi2 pipelines are not valid.'],
            [facetPayloadValidator(payloadList[3]),
                'The out2 output contains one or more invalid stages.'],
            [facetPayloadValidator(payloadList[4]),
                'The out2multi1 / out2multi2 outputs contains one or more invalid stages.'],
            [facetPayloadValidator(payloadList[5]),
                'The out3 output contains one or more incompatible stages.'],
            [facetPayloadValidator(payloadList[6]),
                'The out3multi1 / out3multi2 outputs contains one or more incompatible stages.'],
            [facetPayloadValidator(payloadList[7]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
