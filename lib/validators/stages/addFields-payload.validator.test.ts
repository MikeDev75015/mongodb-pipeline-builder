import {addFieldsPayloadValidator} from "./addFields-payload.validator";

describe('addFields validators', () => {
    describe('addFieldsPayloadValidator', () => {
        const payloadList: any[] = [
            {},
            { tests: undefined },
            { tests: 'unit' },
            [{ tests: 'unit' }]
        ];

        test.each([
            [addFieldsPayloadValidator(payloadList[0]),
                'No fields have been added.'],
            [addFieldsPayloadValidator(payloadList[1]),
                'One or more field values are not defined.'],
            [addFieldsPayloadValidator(payloadList[2]), ''],
            [addFieldsPayloadValidator(payloadList[3]),
                'The payload is not valid.'],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
