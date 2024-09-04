import { ProjectValue } from '../../models/stages/project-stage';
import { ProjectHelper } from './project.helper';

describe('ProjectHelper', () => {
  test.each([
    ['field', 0, { field: 0 }],
    ['field', 1, { field: 1 }],
    ['field', true, { field: true }],
    ['field', false, { field: false }],
    ['field', { $cond: {} }, { field: { $cond: {} } }],
  ])('should return %p when called with %p', (field, value, expected) => {
    expect(
      ProjectHelper(field, value as ProjectValue),
    ).toEqual(expected);
  });
});
