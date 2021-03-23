import {Ignore, IgnorePayload, Only, OnlyPayload} from "./";

describe('$project stage helpers', () => {

    describe('OnlyPayload', () => {
        it('should return a $project object with specified properties to include', () => {
            expect(OnlyPayload('test', 'test2')).toEqual({ _id: 0, test: 1, test2: 1 });
            expect(OnlyPayload('_id', 'test', 'test2')).toEqual({ test: 1, test2: 1 });
        });
    });

    describe('IgnorePayload', () => {
        it('should return a $project object with specified properties to exclude', () => {
            expect(IgnorePayload('test2', 'test')).toEqual({ test2: 0, test: 0 });
        });
    });

    describe('Only', () => {
        it('should return a $project object with specified properties to include', () => {
            expect(Only('test', 'test2')).toEqual({ _id: 0, test: 1, test2: 1 });
            expect(Only('_id', 'test', 'test2')).toEqual({ test: 1, test2: 1 });
        });
    });

    describe('Ignore', () => {
        it('should return a $project object with specified properties to exclude', () => {
            expect(Ignore('test2', 'test')).toEqual({ test2: 0, test: 0 });
        });
    });
});
