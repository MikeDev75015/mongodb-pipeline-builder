import {lookupPayloadValidator} from "./lookup-payload.validator";

describe('lookupPayloadValidator', () => {
    test.each([
        ['The from and as properties are required', 'from and as properties are missing', { name: 'toto' }],
        ['The from property is required', 'from property is missing', { as: 'toto' }],
        ['The as property is required', 'as property is missing', { from: 'toto' }],
        ['', 'from and as properties are present', { from: 'unit', as:'test' }],
        ['The foreignField property is required when localfield is specified.',
            'foreignField property is missing', { from: 'unit', as:'test', localField: 'name' }],
        ['The localField property is required when foreignField is specified.',
            'localfield property is missing', { from: 'unit', as:'test', foreignField: 'name' }],
        ['', 'from and as properties are present',
            { from: 'unit', as:'test', localField: 'name', foreignField: 'name' }],
    ])('should return [ %s ] IF the %s', (
        result: string,
        caseName: string,
        payload: any
    ) => {
        expect(lookupPayloadValidator(payload)).toEqual(result);
    });
});
