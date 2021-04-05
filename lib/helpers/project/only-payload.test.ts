import {OnlyPayload} from "./only-payload";

describe('OnlyPayload', () => {
    it('should return a $project object with specified properties to include', () => {
        expect(OnlyPayload('test', 'test2')).toEqual({ _id: 0, test: 1, test2: 1 });
        expect(OnlyPayload('_id', 'test', 'test2')).toEqual({ test: 1, test2: 1 });
    });
});
