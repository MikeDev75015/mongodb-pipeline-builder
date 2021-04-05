import {IgnorePayload} from "./ignore-payload";

describe('IgnorePayload', () => {
    it('should return a $project object with specified properties to exclude', () => {
        expect(IgnorePayload('test2', 'test')).toEqual({ test2: 0, test: 0 });
    });
});
