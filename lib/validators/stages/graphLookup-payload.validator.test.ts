import {graphLookupPayloadValidator} from "./graphLookup-payload.validator";

describe('graphLookup validators', () => {
    describe('graphLookupPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [graphLookupPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
