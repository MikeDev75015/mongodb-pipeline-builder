import {indexStatsPayloadValidator} from "./indexStats-payload.validator";

describe('indexStats validators', () => {
    describe('indexStatsPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [indexStatsPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
