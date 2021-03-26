import {matchPayloadValidator} from "./match-payload.validator";

describe('match validators', () => {
    describe('matchPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [matchPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
