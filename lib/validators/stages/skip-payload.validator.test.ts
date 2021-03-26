import {skipPayloadValidator} from "./skip-payload.validator";

describe('skip validators', () => {
    describe('skipPayloadValidator', () => {
        const payloadList: any[] = [
            100
        ];
        test.each([
            [skipPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
