import { SearchHelper } from './search.helper';

describe('Atlas Search helper', () => {
  it('should return search payload', () => {
    expect(SearchHelper('near', {
      'path': 'released',
      'origin': '2011-09-01T00:00:00.000+00:00',
      'pivot': 7776000000,
    })).toEqual({
      near: {
        'path': 'released',
        'origin': '2011-09-01T00:00:00.000+00:00',
        'pivot': 7776000000,
      }
    });
  });

  it('should return search payload with optional properties set', () => {
    expect(SearchHelper('near', {
      'path': 'released',
      'origin': '2011-09-01T00:00:00.000+00:00',
      'pivot': 7776000000,
    }, { returnStoredSource: true, scoreDetails: true })).toEqual({
      near: {
        'path': 'released',
        'origin': '2011-09-01T00:00:00.000+00:00',
        'pivot': 7776000000,
      },
      returnStoredSource: true,
      scoreDetails: true,
    });
  });
});
