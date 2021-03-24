import {addFieldsPayloadValidator} from "./addFields-payload.validator";

describe('addFields validators', () => {
    describe('addFieldsPayloadValidator', () => {
        test.each([
            [addFieldsPayloadValidator({}), 'No fields have been added.'],
            [addFieldsPayloadValidator({ tests: undefined }), 'One or more fields are undefined.'],
            [addFieldsPayloadValidator({ tests: 'unit' }), ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
