import {listSessionsPayloadValidator} from "./listSessions-payload.validator";

describe('listSessions validators', () => {
    describe('listSessionsPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [listSessionsPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
