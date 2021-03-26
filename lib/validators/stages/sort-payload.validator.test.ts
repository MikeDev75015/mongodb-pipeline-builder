import {sortPayloadValidator} from "./sort-payload.validator";

describe('sort validators', () => {
    describe('sortPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [sortPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
