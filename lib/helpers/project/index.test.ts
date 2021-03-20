import { Ignore, Only } from "./";

describe('$project stage helpers', () => {

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
