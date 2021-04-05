import {Only} from "./only";

describe('Only', () => {
    it('should return a $project object with specified properties to include', () => {
        expect(Only('test', 'test2')).toEqual({ _id: 0, test: 1, test2: 1 });
        expect(Only('_id', 'test', 'test2')).toEqual({ test: 1, test2: 1 });
    });
});
