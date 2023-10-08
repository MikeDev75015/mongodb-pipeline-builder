import {geoNearPayloadValidator} from "./geoNear-payload.validator";

describe('geoNear validators', () => {
    describe('geoNearPayloadValidator', () => {
        const payloadList: any[] = [
            {},
            { near: 'unit', distanceField: 'tests' }
        ];
        test.each([
            [geoNearPayloadValidator(payloadList[0]),
                'The near and the distanceField properties are required.'],
            [geoNearPayloadValidator(payloadList[1]),
                'VALID'],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
