import {unsetPayloadValidator} from "./unset-payload.validator";

describe('unset validators', () => {
    describe('unsetPayloadValidator', () => {
        const payloadList: any[] = [
            'test'
        ];
        test.each([
            [unsetPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
