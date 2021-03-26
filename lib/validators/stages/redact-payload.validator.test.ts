import {redactPayloadValidator} from "./redact-payload.validator";

describe('redact validators', () => {
    describe('redactPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [redactPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
