import {countPayloadValidator} from "./count-payload.validator";

describe('count validators', () => {
    describe('countPayloadValidator', () => {
        const payloadList: any[] = [
            '  ',
            '$tests',
            'unit.tests',
            'unit'
        ];

        test.each([
            [countPayloadValidator(payloadList[0]),
                'The value must be a non-empty string.'],
            [countPayloadValidator(payloadList[1]),
                'The value must not start with $.'],
            [countPayloadValidator(payloadList[2]),
                'The value must not contain the . character.'],
            [countPayloadValidator(payloadList[3]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
