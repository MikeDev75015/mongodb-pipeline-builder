import {outPayloadValidator} from "./out-payload.validator";

describe('out validators', () => {
    describe('outPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [outPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
