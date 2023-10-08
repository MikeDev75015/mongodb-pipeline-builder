import {matchPayloadValidator} from "./match-payload.validator";

describe('match validators', () => {
    describe('matchPayloadValidator', () => {
        const payloadList: any[] = [
            {},
            { id: 1 },
        ];
        test.each([
            [matchPayloadValidator(payloadList[0]),
                'The payload is not valid.'],
            [matchPayloadValidator(payloadList[1]),
                'VALID'],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
