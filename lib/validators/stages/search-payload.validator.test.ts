import {searchPayloadValidator} from "./search-payload.validator";

describe('search validators', () => {
    describe('searchPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [searchPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
