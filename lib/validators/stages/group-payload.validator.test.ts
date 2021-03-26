import {groupPayloadValidator} from "./group-payload.validator";

describe('group validators', () => {
    describe('groupPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [groupPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
