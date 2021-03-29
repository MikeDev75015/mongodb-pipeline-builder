import {sortPayloadValidator} from "./sort-payload.validator";

describe('sort validators', () => {
    describe('sortPayloadValidator', () => {
        const payloadList: any[] = [
            {},
            { tests: undefined },
            { tests: 'unit' }
        ];
        test.each([
            [sortPayloadValidator(payloadList[0]),
                'No fields have been added.'],
            [sortPayloadValidator(payloadList[1]),
                'One or more field values are not defined.'],
            [sortPayloadValidator(payloadList[2]), ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
