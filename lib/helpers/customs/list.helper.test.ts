import {List} from "./list.helper";

describe('List', () => {
    it('should create a list with the arguments passed in parameter', () => {
        expect(List('unit', 'test')).toEqual(['unit', 'test']);
    });
});
