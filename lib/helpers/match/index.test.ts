import {Expression, Field, Match} from "./index";

describe('$match stage helpers', () => {
    describe('Project', () => {
        it('should return $match stage with provided value', () => {
            expect(Match({ unit: 'test' })).toEqual({ $match: { unit: 'test' } });
        });
    });

    describe('Expression', () => {
        it('should return a $expr object with specified value', () => {
            expect(Expression(1)).toEqual({ $expr: 1 });
        });
    });

    describe('Field', () => {
        it('should return a matching field query', () => {
            expect(Field('unit', 'test')).toEqual({ unit: 'test' });
        });
    });
});
