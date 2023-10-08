import {bucketAutoPayloadValidator} from "./bucket-auto-payload.validator";
import {BucketAutoStage} from "../../models";

describe('bucket auto validators', () => {
    describe('bucketAutoPayloadValidator', () => {
        const payloadList = [
            {},
            { groupBy: 'tests' },
            { buckets: 1 },
            { groupBy: 'tests', buckets: 0 },
            { groupBy: 'tests', buckets: 2, granularity: 'ABC' },
            { groupBy: 'tests', buckets: 1 },
        ];
        test.each([
            [bucketAutoPayloadValidator(payloadList[0] as BucketAutoStage),
                'The groupBy and buckets properties are required.'],
            [bucketAutoPayloadValidator(payloadList[1] as BucketAutoStage),
                'The buckets property is required.'],
            [bucketAutoPayloadValidator(payloadList[2] as BucketAutoStage),
                'The groupBy property is required.'],
            [bucketAutoPayloadValidator(payloadList[3] as BucketAutoStage),
                'The buckets value is not valid. You must specify a positive 32-bit integer.'],
            [bucketAutoPayloadValidator(payloadList[4] as BucketAutoStage),
                'The granularity value is not valid. You must specify one of these possible values: R5 | R10 | R20 | R40 | R80 | 1-2-5 | E6 | E12 | E24 | E48 | E96 | E192 | POWERSOF2.'],
            [bucketAutoPayloadValidator(payloadList[5] as BucketAutoStage),
                'VALID'],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
