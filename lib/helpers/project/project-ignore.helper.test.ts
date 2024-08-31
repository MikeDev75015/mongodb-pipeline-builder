import { ProjectIgnoreHelper } from './project-ignore.helper';

describe('ProjectIgnoreHelper', () => {
  it('should return a $project object with specified properties to exclude', () => {
    expect(ProjectIgnoreHelper('test2', 'test')).toEqual({ test2: 0, test: 0 });
  });
});
