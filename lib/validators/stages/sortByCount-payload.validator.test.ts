import {sortByCountPayloadValidator} from "./sortByCount-payload.validator";

describe('sortByCount validators', () => {
    describe('sortByCountPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [sortByCountPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
