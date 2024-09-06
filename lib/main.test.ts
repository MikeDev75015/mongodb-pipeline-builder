/* tslint:disable:no-string-literal */
import { Field, PipelineBuilder } from './';
import { PipelineError } from './errors';
import { CurrentOpStage, PipelineStage } from './models';

describe('should create a new pipeline builder object', () => {
  describe('pipeline Builder With Debug', () => {
    let pipelineBuilderWithDebug: PipelineBuilder;

    beforeEach(() => {
      pipelineBuilderWithDebug = new PipelineBuilder('debug', { debug: true, logs: true });
    });

    it('should be defined', () => {
      expect(pipelineBuilderWithDebug).toBeDefined();
    });

    describe('get name()', () => {
      it('should return the pipeline builder name passed in the constructor', () => {
        expect(pipelineBuilderWithDebug.name).toEqual('debug');
      });
    });

    describe('toggleDebug', () => {
      it('should toggle the value', () => {
        const actualValue = pipelineBuilderWithDebug['builderOptions'].debug;
        pipelineBuilderWithDebug['toggleDebug']();

        expect(pipelineBuilderWithDebug['builderOptions'].debug).not.toBe(actualValue);
      });
    });

    describe('startDebug()', () => {
      it('should enable the builder debug', () => {
        expect(pipelineBuilderWithDebug.startDebug()).toEqual(pipelineBuilderWithDebug);
      });
    });

    describe('stopDebug()', () => {
      it('should disable the builder debug', () => {
        expect(pipelineBuilderWithDebug.stopDebug()).toEqual(pipelineBuilderWithDebug);
      });
    });

    describe('logDebuggedActions()', () => {
      it('should log actions stored in the history list', () => {
        const spyDebug = spyOn(console, 'debug');
        const spyConsoleDir = spyOn(console, 'dir');

        pipelineBuilderWithDebug.logDebuggedActions();

        expect(spyDebug).toHaveBeenCalledTimes(2);
        expect(spyConsoleDir).toHaveBeenCalledTimes(1);
      });
    });

    describe('Paging()', () => {
      it(
        'should return a new pipeline with a $facet step that contains 2 pipelines, one for paginated documents with 10 elements per page and another for the total count',
        () => {
          expect(
            pipelineBuilderWithDebug
              ['addStage']('$match', { tests: 'unit' })
            .Paging(10).build(),
          ).toEqual([
            {
              $facet: {
                count: [
                  { $match: { tests: 'unit' } },
                  { $count: 'totalElements' },
                ],
                docs: [
                  { $match: { tests: 'unit' } },
                  { $skip: 0 },
                  { $limit: 10 },
                ],
              },
            },
          ]);
        },
      );

      it(
        'should return a new pipeline with a $facet step that contains 2 pipelines, one for paginated documents with 20 elements per page, the page 5 requested and another for the total count',
        () => {
          expect(
            pipelineBuilderWithDebug
              ['addStage']('$match', { tests: 'unit' })
            .Paging(20, 5).build(),
          ).toEqual([
            {
              $facet: {
                count: [
                  { $match: { tests: 'unit' } },
                  { $count: 'totalElements' },
                ],
                docs: [
                  { $match: { tests: 'unit' } },
                  { $skip: 80 },
                  { $limit: 20 },
                ],
              },
            },
          ]);
        },
      );

      it('should throw a new PipelineError if the elements per page is not valid', () => {
        expect(
          () => pipelineBuilderWithDebug
            ['addStage']('$match', { tests: 'unit' })
          .Paging(0),
        ).toThrowError(new PipelineError('You must specify at least 1 element per page.'));
      });

      it('should throw a new PipelineError if the requested page does not exist', () => {
        expect(
          () => pipelineBuilderWithDebug
            ['addStage']('$match', { tests: 'unit' })
          .Paging(10, 0),
        ).toThrowError(new PipelineError('The page 0 does not exist.'));
      });

      it('should throw a new PipelineError if a Paging stage has already been added', () => {
        expect(
          () => pipelineBuilderWithDebug
          .Paging(10, 1)
          .Paging(3, 2),
        ).toThrowError(new PipelineError('A Paging stage has already been added.'));
      });

      it('should throw a new PipelineError if a Skip stage has already been added', () => {
        expect(
          () => pipelineBuilderWithDebug
          .Skip(10)
          .Paging(3),
        )
        .toThrowError(new PipelineError(
          'A Paging stage cannot be added if a Skip, Limit, or Count stage is already in the pipeline.'));
      });

      it('should throw a new PipelineError if a Limit stage has already been added', () => {
        expect(
          () => pipelineBuilderWithDebug
          .Limit(10)
          .Paging(1),
        )
        .toThrowError(new PipelineError(
          'A Paging stage cannot be added if a Skip, Limit, or Count stage is already in the pipeline.'));
      });

      it('should throw a new PipelineError if a Count stage has already been added', () => {
        expect(
          () => pipelineBuilderWithDebug
          .Count('total')
          .Paging(3, 8),
        )
        .toThrowError(new PipelineError(
          'A Paging stage cannot be added if a Skip, Limit, or Count stage is already in the pipeline.'));
      });

    });

    describe('addStage()', () => {
      it('should not add the stage to the pipeline if its value is invalid', () => {
        expect(() => pipelineBuilderWithDebug['addStage']('$match', undefined))
        .toThrowError(new PipelineError('The $match stage value is not valid.'));
      });

      it('should not add the stage to the pipeline if its payload is invalid', () => {
        expect(() => pipelineBuilderWithDebug.Lookup({ from: 'tests', as: 'unit', localField: 'expect' }))
        .toThrowError(new PipelineError(
          'Invalid $lookup stage value. The foreignField property is required when localfield is specified.'));
      });

      test.each([
        [
          'should add a stage to the pipeline', 'addFields',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .AddFields({ tests: 'unit' }),
          { tests: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'addFields',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .AddFields({ tests: 'unit' }, { test: 'unit' }),
          { tests: 'unit', test: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'bucket',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Bucket({ groupBy: '$name', boundaries: [1, 2, 3] }),
          { groupBy: '$name', boundaries: [1, 2, 3] },
        ],
        [
          'should add a stage to the pipeline', 'bucketAuto',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .BucketAuto({ groupBy: '$age', buckets: 5 }), { groupBy: '$age', buckets: 5 },
        ],
        [
          'should add a stage to the pipeline', 'changeStream',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ChangeStream({ fullDocumentBeforeChange: 'whenAvailable' }), { fullDocumentBeforeChange: 'whenAvailable' },
        ],
        [
          'should add a stage to the pipeline', 'changeStreamSplitLargeEvent',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ChangeStreamSplitLargeEvent(), {},
        ],
        [
          'should add a stage to the pipeline', 'collStats',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .CollStats(
            { latencyStats: { histograms: false }, storageStats: { scale: 2 }, count: {}, queryExecStats: {} },
          ), { latencyStats: { histograms: false }, storageStats: { scale: 2 }, count: {}, queryExecStats: {} },
        ],
        [
          'should add a stage to the pipeline', 'count',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Count('testCount'), 'testCount',
        ],
        [
          'should add a stage to the pipeline', 'currentOp',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .CurrentOp({ allUsers: true } as CurrentOpStage), { allUsers: true },
        ],
        [
          'should add a stage to the pipeline',
          'densify',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Densify({ field: 'test', range: { bounds: 'full', step: 1 } }),
          { field: 'test', range: { bounds: 'full', step: 1 } },
        ],
        [
          'should add a stage to the pipeline', 'documents',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Documents({ output1: [] }, { output2: [] }), [{ output1: [] }, { output2: [] }],
        ],
        [
          'should add a stage to the pipeline', 'facet',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Facet({ output1: [] }, { output2: [] }), { output1: [], output2: [] },
        ],
        [
          'should add a stage to the pipeline', 'facet',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Facet({ output1: [], output2: [] }), { output1: [], output2: [] },
        ],
        [
          'should add a stage to the pipeline', 'fill',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Fill({ output: { test: { value: 'test' } } }), { output: { test: { value: 'test' } } },
        ],
        [
          'should add a stage to the pipeline', 'geoNear',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .GeoNear({ near: { type: 'Point', coordinates: [20, 5] }, distanceField: 'distance' }),
          { near: { type: 'Point', coordinates: [20, 5] }, distanceField: 'distance' },
        ],
        [
          'should add a stage to the pipeline', 'graphLookup',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .GraphLookup(
            {
              from: 'tests', startWith: ['15', '30', '45'], connectFromField: 'testId', connectToField: 'id',
              as: 'pts',
            },
          ), {
          from: 'tests', startWith: ['15', '30', '45'], connectFromField: 'testId', connectToField: 'id',
          as: 'pts',
        },
        ],
        [
          'should add a stage to the pipeline', 'group',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Group({ _id: 'unit', tests: { $push: 'num' } }),
          { _id: 'unit', tests: { $push: 'num' } },
        ],
        [
          'should add a stage to the pipeline', 'indexStats',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .IndexStats(), {},
        ],
        [
          'should add a stage to the pipeline', 'limit',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Limit(200), 200,
        ],
        [
          'should add a stage to the pipeline', 'listLocalSessions',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ListLocalSessions({ allUsers: true }), { allUsers: true },
        ],
        [
          'should add a stage to the pipeline', 'listSampledQueries',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ListSampledQueries({ namespace: 'test' }), { namespace: 'test' },
        ],
        [
          'should add a stage to the pipeline', 'listSearchIndexes',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ListSearchIndexes({ name: 'test' }), { name: 'test' },
        ],
        [
          'should add a stage to the pipeline', 'listSessions',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ListSessions({ tests: 'unit' }), { tests: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'lookup',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Lookup({ from: 'unit', as: 'test' }), { from: 'unit', as: 'test' },
        ],
        [
          'should add a stage to the pipeline', 'match',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Match({ tests: 'unit' }), { tests: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'merge',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Merge({ into: 'unit' }), { into: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'out',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Out({ db: 'tests', coll: 'unit' }), { db: 'tests', coll: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'planCacheStats',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .PlanCacheStats(), {},
        ],
        [
          'should add a stage to the pipeline', 'project',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Project({ tests: 1 }), { tests: 1 },
        ],
        [
          'should add a stage to the pipeline', 'project',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Project({ tests: 1 }, { units: 0 }), { tests: 1, units: 0 },
        ],
        [
          'should add a stage to the pipeline',
          'redact',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Redact({ $cond: { if: 'if', then: '$$KEEP', else: '$$PRUNE' } }),
          { $cond: { if: 'if', then: '$$KEEP', else: '$$PRUNE' } },
        ],
        [
          'should add a stage to the pipeline', 'replaceRoot',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ReplaceRoot({ newRoot: { tests: 'unit' } }), { newRoot: { tests: 'unit' } },
        ],
        [
          'should add a stage to the pipeline', 'replaceWith',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ReplaceWith({ tests: 'unit' }), { tests: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'sample',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Sample({ size: 3 }), { size: 3 },
        ],
        [
          'should add a stage to the pipeline', 'search',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Search({ queryString: { query: 'test', defaultPath: '' } }),
          { queryString: { query: 'test', defaultPath: '' } },
        ],
        [
          'should add a stage to the pipeline', 'searchMeta',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .SearchMeta({
            facet: {
              operator: { queryString: { query: 'test', defaultPath: '' } },
              facets: {},
            },
          }),
          {
            facet: {
              operator: { queryString: { query: 'test', defaultPath: '' } },
              facets: {},
            },
          },
        ],
        [
          'should add a stage to the pipeline', 'set',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Set({ tests: 'unit' }), { tests: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'set',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Set({ tests: 'unit' }, { test: 'unit' }), { tests: 'unit', test: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'setWindowFields',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .SetWindowFields({ output: {} }), { output: {} },
        ],
        [
          'should add a stage to the pipeline', 'shardedDataDistribution',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .ShardedDataDistribution({}), {},
        ],
        [
          'should add a stage to the pipeline', 'skip',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Skip(100), 100,
        ],
        [
          'should add a stage to the pipeline', 'sort',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Sort({ tests: 1 }), { tests: 1 },
        ],
        [
          'should add a stage to the pipeline', 'sort',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Sort({ tests: -1 }, { test: -1 }), { tests: -1, test: -1 },
        ],
        [
          'should add a stage to the pipeline', 'sortByCount',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .SortByCount({ tests: 'unit' }), { tests: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'unionWith',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .UnionWith({ coll: 'unit' }), { coll: 'unit' },
        ],
        [
          'should add a stage to the pipeline', 'unset',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Unset('toto'), 'toto',
        ],
        [
          'should add a stage to the pipeline', 'unset',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Unset('toto', 'test', 'unit'), ['toto', 'test', 'unit'],
        ],
        [
          'should add a stage to the pipeline', 'unwind',
          new PipelineBuilder('debug', { debug: true, logs: true })
          .Unwind('$tests'), '$tests',
        ],
      ])('%s: $%s => %o', (
        nameTest: string,
        stageType: string,
        stageOperation: any,
        expectedValue: any,
      ) => {
        // addFields => $addFields
        const expected = {
          ['$' + stageType]: expectedValue,
        };

        expect(stageOperation.build()[0]).toEqual(expected);
      });
    });

    describe('verifyPipelineValidity', () => {
      const pipelineWithErrors = [
        { $count: ' ' },
        { $sort: { id: 'date' } },
      ] as PipelineStage[];

      it('should throw an error message list if invalid stage is found', () => {
        // tslint:disable-next-line:no-string-literal
        expect(() => pipelineBuilderWithDebug['verifyPipelineValidity'](pipelineWithErrors))
        .toThrowError(new PipelineError(
          '1) Invalid $count stage value. The value must be a non-empty string.\n2) Invalid $sort stage value. One or more values are not valid. date...',
        ));
      });
    });
  });

  describe('pipeline Builder Without Debug', () => {
    let pipelineBuilderWithoutDebug: PipelineBuilder;

    beforeEach(() => {
      pipelineBuilderWithoutDebug = new PipelineBuilder('no-debug');
    });

    it('should throw a PipelineError if the pipeline is empty', () => {
      expect(
        () => pipelineBuilderWithoutDebug.build(),
      ).toThrow(new PipelineError(`Error, ${pipelineBuilderWithoutDebug.name} pipeline is empty!`));
    });

    it('should throw a PipelineError if the stage value is invalid', () => {
      expect(
        () => pipelineBuilderWithoutDebug.Match({}).build(),
      ).toThrowError(new PipelineError('Invalid $match stage value. The payload is not valid.'));
    });

    it('should throw a PipelineError if the stage payload is invalid', () => {
      expect(
        () => pipelineBuilderWithoutDebug.Lookup({ from: 'test', as: 'unit', localField: 'toto' }).build(),
      )
      .toThrowError(new PipelineError(
        'Invalid $lookup stage value. The foreignField property is required when localfield is specified.'));
    });

    it(
      'should throw a PipelineError if the stage value or one of its element is not valid when calling toObject method',
      () => {
        expect(() => pipelineBuilderWithoutDebug.AddFields(
          ['{ tests: \'unit\' }'],
        )).toThrowError(new PipelineError('The AddFields stage value is not valid.'));
      },
    );

    it(
      'should throw a PipelineError if the stage value or one of its element is not valid when calling toObject method',
      () => {
        expect(() => pipelineBuilderWithoutDebug.AddFields(
          [{ tests: 'unit' }], { test: 'unit' }, {}, [{}],
        )).toThrowError(new PipelineError('3 fields of the AddFields stage are not valid.'));
      },
    );

    describe('build', () => {
      it('should not log debugged actions if debug is false and debug action list is empty', () => {
        const spyLogDebuggedActions = spyOn(pipelineBuilderWithoutDebug, 'logDebuggedActions');
        pipelineBuilderWithoutDebug['stageList'].push({ $skip: 5 });
        pipelineBuilderWithoutDebug.build();

        expect(spyLogDebuggedActions).not.toHaveBeenCalled();
      });
    });

    describe('Insert', () => {
      const matchStage = { $match: { name: 'toto' } };
      const unknownStage = { $test: 'toto' };

      it('should add user custom stage, disable validation and build', () => {
        pipelineBuilderWithoutDebug.Match(Field('name', 'toto')).Insert(unknownStage);

        expect(pipelineBuilderWithoutDebug['stageList'])
        .toEqual([matchStage, { ...unknownStage, disableValidation: true }]);
        expect(pipelineBuilderWithoutDebug.build()).toEqual([matchStage, unknownStage]);
      });
    });

    describe('isValidStage', () => {
      it('should return unexpected stage name error', () => {
        expect(pipelineBuilderWithoutDebug['isValidStage']({ test: {} } as PipelineStage)).toEqual({
          stageType: 'test', message: 'Unexpected stage name. Received: test',
        });
      });
    });

    describe('checkInvalidDuplicatedStages', () => {
      it('should return a list of all non duplicable stages if found', () => {
        expect(pipelineBuilderWithoutDebug['checkInvalidDuplicatedStages']([
          { $match: { id: 1 } },
          { $out: 'test' },
          { $out: 'test2' },
        ])).toEqual(['$out']);
      });
    });

    describe('verifyPipelineValidity', () => {
      it('should return a list of all non duplicable stages if found', () => {
        expect(() => pipelineBuilderWithoutDebug['verifyPipelineValidity']([
          { $match: { id: 1 } },
          { $out: 'test' },
          { $out: 'test2' },
          { $changeStreamSplitLargeEvent: {} },
          { $changeStreamSplitLargeEvent: {} },
        ])).toThrow(new PipelineError(
          `Error, ${pipelineBuilderWithoutDebug.name} pipeline contains invalid duplicated stages! $changeStreamSplitLargeEvent, $out.`,
        ));
      });
    });
  });
});
