import {planCacheStatsPayloadValidator} from "./planCacheStats-payload.validator";

describe('planCacheStats validators', () => {
    describe('planCacheStatsPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [planCacheStatsPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
