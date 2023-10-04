import {ProjectOnlyHelper} from "./project-only.helper";

describe('ProjectOnlyHelper', () => {
    it('should return a $project object with specified properties to include', () => {
        expect(ProjectOnlyHelper('test', 'test2')).toEqual({ _id: 0, test: 1, test2: 1 });
        expect(ProjectOnlyHelper('_id', 'test', 'test2')).toEqual({ test: 1, test2: 1 });
    });
});
