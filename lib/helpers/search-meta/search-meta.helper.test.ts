import { SearchMetaHelper } from './search-meta.helper';

describe('SearchMeta helper', () => {
  const date = new Date('2011-09-01T00:00:00.000+00:00');

  it('should return search meta payload', () => {
    expect(SearchMetaHelper({
      facet: {
        operator: {
          near: {
            path: 'released',
            origin: date,
            pivot: 7776000000,
          },
        },
        facets: {
          test: {
            type: 'number',
            path: 'released',
            boundaries: [0, 100],
          },
        },
      },
    })).toEqual({
      facet: {
        operator: {
          near: {
            path: 'released',
            origin: date,
            pivot: 7776000000,
          },
        },
        facets: {
          test: {
            type: 'number',
            path: 'released',
            boundaries: [0, 100],
          },
        },
      },
    });
  });

  it('should return search meta payload with optional properties set', () => {
    expect(SearchMetaHelper({
      facet: {
        operator: {
          near: {
            path: 'released',
            origin: date,
            pivot: 7776000000,
          },
        },
        facets: {
          test: {
            type: 'number',
            path: 'released',
            boundaries: [0, 100],
          },
        },
      },
    }, {
      index: 'index',
    })).toEqual({
      index: 'index',
      facet: {
        operator: {
          near: {
            path: 'released',
            origin: date,
            pivot: 7776000000,
          },
        },
        facets: {
          test: {
            type: 'number',
            path: 'released',
            boundaries: [0, 100],
          },
        },
      },
    });
  });
});
