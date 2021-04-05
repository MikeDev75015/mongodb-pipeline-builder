import {Ignore} from "./ignore";

describe('Ignore', () => {
    it('should return a $project object with specified properties to exclude', () => {
        expect(Ignore('test2', 'test')).toEqual({ test2: 0, test: 0 });
    });
});
