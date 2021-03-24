import {bucketPayloadValidator} from "./bucket-payload.validator";
import {BucketStageInterface} from "../../interfaces";

describe('bucket validators', () => {
    describe('bucketPayloadValidator', () => {
        const payloadList = [
            {},
            { groupBy: 'tests' },
            { boundaries: [] },
            { groupBy: 'tests', boundaries: [1] },
            { groupBy: 'tests', boundaries: [2, 3] },
        ];
        test.each([
            [bucketPayloadValidator(payloadList[0] as BucketStageInterface),
                'The groupBy and boundaries properties are required.'],
            [bucketPayloadValidator(payloadList[1] as BucketStageInterface),
                'The boundaries property is required.'],
            [bucketPayloadValidator(payloadList[2] as BucketStageInterface),
                'The groupBy property is required.'],
            [bucketPayloadValidator(payloadList[3] as BucketStageInterface),
                'The boundaries value is not valid. You must specify at least two boundaries.'],
            [bucketPayloadValidator(payloadList[4] as BucketStageInterface),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
