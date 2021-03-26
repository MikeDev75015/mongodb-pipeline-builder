import {unionWithPayloadValidator} from "./unionWith-payload.validator";

describe('unionWith validators', () => {
    describe('unionWithPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [unionWithPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
