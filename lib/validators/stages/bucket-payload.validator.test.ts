import {bucketPayloadValidator} from "./bucket-payload.validator";
import {BucketStage} from "../../models";

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
            [bucketPayloadValidator(payloadList[0] as BucketStage),
                'The groupBy and boundaries properties are required.'],
            [bucketPayloadValidator(payloadList[1] as BucketStage),
                'The boundaries property is required.'],
            [bucketPayloadValidator(payloadList[2] as BucketStage),
                'The groupBy property is required.'],
            [bucketPayloadValidator(payloadList[3] as BucketStage),
                'The boundaries value is not valid. You must specify at least two boundaries.'],
            [bucketPayloadValidator(payloadList[4] as BucketStage),
                'VALID'],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
