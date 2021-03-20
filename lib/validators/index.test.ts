import {lookupPayloadValidator} from "./index";

describe('lookupPayloadValidator', () => {
    test.each([
        ['The from and as properties are required', 'from and as properties are missing', { name: 'toto' }],
        ['The from property is required', 'from property is missing', { as: 'toto' }],
        ['The as property is required', 'as property is missing', { from: 'toto' }],
        ['', 'from and as properties are present', { from: 'unit', as:'test' }],
    ])('should return [ %s ] IF the %s', (
        result: string,
        caseName: string,
        payload: any
    ) => {
        expect(lookupPayloadValidator(payload)).toEqual(result);
    });
});
