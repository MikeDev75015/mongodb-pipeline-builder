import {unwindPayloadValidator} from "./unwind-payload.validator";

describe('unwind validators', () => {
    describe('unwindPayloadValidator', () => {
        const payloadList: any[] = [
            []
        ];
        test.each([
            [unwindPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
