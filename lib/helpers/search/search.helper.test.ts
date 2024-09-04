import { SearchHelper } from './search.helper';

describe('Search helper', () => {
  const date = new Date('2011-09-01T00:00:00.000+00:00');

  it('should return search payload', () => {
    expect(SearchHelper({
      near: {
        path: 'released',
        origin: date,
        pivot: 7776000000,
      },
    })).toEqual({
      near: {
        'path': 'released',
        'origin': date,
        'pivot': 7776000000,
      },
    });
  });

  it('should return search payload with optional properties set', () => {
    expect(SearchHelper({
      near: {
        path: 'released',
        origin: date,
        pivot: 7776000000,
      },
    }, {
      returnStoredSource: true,
      scoreDetails: true,
      index: 'index',
    })).toEqual({
      index: 'index',
      near: {
        path: 'released',
        origin: date,
        pivot: 7776000000,
      },
      returnStoredSource: true,
      scoreDetails: true,
    });
  });
});
