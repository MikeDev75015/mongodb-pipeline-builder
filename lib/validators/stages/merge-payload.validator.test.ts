import {mergePayloadValidator} from "./merge-payload.validator";

describe('merge validators', () => {
    describe('mergePayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [mergePayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
