import {List, Field} from "./";

describe('List', () => {
    it('should create a list with the arguments passed in parameter', () => {
        expect(List('unit', 'test')).toEqual(['unit', 'test']);
    });
});

describe('Field', () => {
    it('should create a javascript object', () => {
        expect(Field('unit', 'test')).toEqual({ unit: 'test' });
    });
});
