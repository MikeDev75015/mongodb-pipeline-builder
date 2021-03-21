import { IgnorePayload, OnlyPayload } from "./";

describe('$project stage helpers', () => {

    describe('Only', () => {
        it('should return a $project object with specified properties to include', () => {
            expect(OnlyPayload('test', 'test2')).toEqual({ _id: 0, test: 1, test2: 1 });
            expect(OnlyPayload('_id', 'test', 'test2')).toEqual({ test: 1, test2: 1 });
        });
    });

    describe('Ignore', () => {
        it('should return a $project object with specified properties to exclude', () => {
            expect(IgnorePayload('test2', 'test')).toEqual({ test2: 0, test: 0 });
        });
    });
});
