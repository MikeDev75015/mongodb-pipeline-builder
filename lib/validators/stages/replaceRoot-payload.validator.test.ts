import {replaceRootPayloadValidator} from "./replaceRoot-payload.validator";

describe('replaceRoot validators', () => {
    describe('replaceRootPayloadValidator', () => {
        const payloadList: any[] = [

        ];
        test.each([
            [replaceRootPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
