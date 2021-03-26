import {setPayloadValidator} from "./set-payload.validator";

describe('set validators', () => {
    describe('setPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [setPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
