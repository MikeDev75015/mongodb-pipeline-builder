import {List, Property} from "./";

describe('List', () => {
    it('should create a list with the arguments passed in parameter', () => {
        expect(List('unit', 'test')).toEqual(['unit', 'test']);
    });
});

describe('Property', () => {
    it('should return a javascript object with the arguments passed in parameter', () => {
        expect(Property('name', 'toto')).toEqual({ name: 'toto' });
    });
});
