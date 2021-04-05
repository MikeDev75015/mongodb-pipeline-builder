import {Field} from "./field";

describe('Field', () => {
    it('should create a javascript object', () => {
        expect(Field('unit', 'test')).toEqual({ unit: 'test' });
    });
});
