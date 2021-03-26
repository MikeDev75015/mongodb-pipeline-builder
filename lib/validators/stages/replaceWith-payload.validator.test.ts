import {replaceWithPayloadValidator} from "./replaceWith-payload.validator";

describe('replaceWith validators', () => {
    describe('replaceWithPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [replaceWithPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
