import {samplePayloadValidator} from "./sample-payload.validator";

describe('sample validators', () => {
    describe('samplePayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [samplePayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
