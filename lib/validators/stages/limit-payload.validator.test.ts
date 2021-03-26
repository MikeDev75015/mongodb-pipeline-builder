import {limitPayloadValidator} from "./limit-payload.validator";

describe('limit validators', () => {
    describe('limitPayloadValidator', () => {
        const payloadList: any[] = [
            10
        ];
        test.each([
            [limitPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
