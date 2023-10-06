import {sortPayloadValidator} from "./sort-payload.validator";

describe('sort validators', () => {
    describe('sortPayloadValidator', () => {
        const payloadList: any[] = [
            {},
            { tests: undefined },
            { tests: 'unit' },
            [{ tests: 'unit' }],
            { tests: 1 },
            { tests: -1 },
            { tests: { $meta: "textScore" } },
        ];
        test.each([
            [sortPayloadValidator(payloadList[0]),
                'No fields have been added.'],
            [sortPayloadValidator(payloadList[1]),
                'One or more field values are not defined.'],
            [sortPayloadValidator(payloadList[2]), 'One or more values are not valid. unit...'],
            [sortPayloadValidator(payloadList[3]), 'The payload is not valid.'],
            [sortPayloadValidator(payloadList[4]), ''],
            [sortPayloadValidator(payloadList[5]), ''],
            [sortPayloadValidator(payloadList[6]), ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
