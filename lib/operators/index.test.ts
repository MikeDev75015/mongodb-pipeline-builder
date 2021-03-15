import {Absolute, Add, Ceil, Divide, Exponent, Expression, Field, Floor, Log, Log10, NaturalLog} from "./index";

describe('Expression', () => {
    it('should return a valid $expr pipeline operator', () => {
        expect(Expression('expression')).toEqual({ $expr: 'expression' });
    });
});

describe('Field', () => {
    it('should perform a a basic query on field', () => {
        expect(Field('name', 'Toto')).toEqual({ name: 'Toto' });
    });
});

describe('Absolute', () => {
    it('should return a valid $abs pipeline operator', () => {
        expect(Absolute(-3)).toEqual({ $abs: -3 });
    });
});

describe('Add', () => {
    it('should return a valid $add pipeline operator', () => {
        expect(Add(5, 8, 12, 45)).toEqual({ $add: [5, 8, 12, 45] });
    });
});

describe('Ceil', () => {
    it('should return a valid $ceil pipeline operator', () => {
        expect(Ceil(0.3)).toEqual({ $ceil: 0.3 });
    });
});

describe('Divide', () => {
    it('should return a valid $divide pipeline operator', () => {
        expect(Divide(10, 5)).toEqual({ $divide: [10, 5] });
    });
});

describe('Exponent', () => {
    it('should return a valid $exp pipeline operator', () => {
        expect(Exponent(9)).toEqual({ $exp: 9 });
    });
});

describe('Floor', () => {
    it('should return a valid $floor pipeline operator', () => {
        expect(Floor(1.9)).toEqual({ $floor: 1.9 });
    });
});

describe('NaturalLog', () => {
    it('should return a valid $ln pipeline operator', () => {
        expect(NaturalLog(4)).toEqual({ $ln: 4 });
    });
});

describe('Log', () => {
    it('should return a valid $log pipeline operator', () => {
        expect(Log(4, 10)).toEqual({ $log: [4, 10] });
    });
});

describe('Log10', () => {
    it('should return a valid $ln pipeline operator', () => {
        expect(Log10(4)).toEqual({ $log10: 4 });
    });
});
