import { PipelineBuilder } from "./";
import { PipelineError } from "./errors";

describe('should create a new pipeline builder object', () => {
    let
        pipelineBuilderWithDebug: PipelineBuilder,
        pipelineBuilderWithoutDebug: PipelineBuilder;

    describe('pipeline Builder With Debug', () => {
        let pipeLineName: string;
        beforeEach(() => {
            pipeLineName = 'builder-test';
            pipelineBuilderWithDebug = new PipelineBuilder(pipeLineName, { debug: true, logs: true});
        });

        it('should be defined', () => {
            expect(pipelineBuilderWithDebug).toBeDefined();
        });

        describe('getName()', () => {
            it('should return the pipeline builder name passed in the constructor', () => {
                expect(pipelineBuilderWithDebug.getName()).toEqual(pipeLineName);
            });
        });

        describe('enableDebug()', () => {
            it('should enable the builder debug', () => {
                expect(pipelineBuilderWithDebug.enableDebug()).toEqual(pipelineBuilderWithDebug);
            });
        });

        describe('disableDebug()', () => {
            it('should disable the builder debug', () => {
                expect(pipelineBuilderWithDebug.disableDebug()).toEqual(pipelineBuilderWithDebug);
            });
        });

        describe('reset()', () => {
            it('should return pipeline reset', () => {
                expect(pipelineBuilderWithDebug.resetPipeline()).toEqual([]);
            });
        });

        describe('getDebugActionList()', () => {
            it('should return the action stored in the debug history list at builder initialization', () => {
                const debugActionList = pipelineBuilderWithDebug.getDebugActionList();
                expect(debugActionList).toHaveLength(1);
                expect(debugActionList[0].action).toEqual(pipelineBuilderWithDebug.getName() + ' => constructor');
            });
        });

        describe('Paging()', () => {

            it('should return a new pipeline with a $facet step that contains 2 pipelines, one for paginated documents with 10 elements per page and another for the total count', () => {
                expect(
                    pipelineBuilderWithDebug
                        .addStage('match', {tests: 'unit'})
                        .Paging(10).getPipeline()
                ).toEqual([
                    { $facet: {
                            count: [
                                { $match: { tests: "unit" }},
                                { $count: "totalElements" }
                            ],
                            docs: [
                                { $match: {tests: "unit" } },
                                { $skip: 0 },
                                { $limit: 10 }
                            ]
                        } }
                ]);
            });

            it('should return a new pipeline with a $facet step that contains 2 pipelines, one for paginated documents with 20 elements per page, the page 5 requested and another for the total count', () => {
                expect(
                    pipelineBuilderWithDebug
                        .addStage('match', {tests: 'unit'})
                        .Paging(20, 5).getPipeline()
                ).toEqual([
                    { $facet: {
                            count: [
                                { $match: { tests: "unit" }},
                                { $count: "totalElements" }
                            ],
                            docs: [
                                { $match: {tests: "unit" } },
                                { $skip: 80 },
                                { $limit: 20 }
                            ]
                        } }
                ]);
            });

            it('should throw a new PipelineError if the elements per page is not valid', () => {
                expect(
                    () => pipelineBuilderWithDebug
                        .addStage('match', {tests: 'unit'})
                        .Paging(0)
                ).toThrowError(new PipelineError('You must specify at least 1 element per page.'));
            });

            it('should throw a new PipelineError if the requested page does not exist', () => {
                expect(
                    () => pipelineBuilderWithDebug
                        .addStage('match', {tests: 'unit'})
                        .Paging(10, 0)
                ).toThrowError(new PipelineError('The page you are looking for does not exist.'));
            });

            it('should throw a new PipelineError if a Paging stage has already been added', () => {
                expect(
                    () => pipelineBuilderWithDebug
                        .Paging(10, 1)
                        .Paging(3, 2)
                ).toThrowError(new PipelineError('A Paging stage has already been added.'));
            });

            it('should throw a new PipelineError if a Skip stage has already been added', () => {
                expect(
                    () => pipelineBuilderWithDebug
                        .Skip(10)
                        .Paging(3)
                ).toThrowError(new PipelineError('A Paging stage cannot be added if a Skip, Limit, or Count stage is already in the pipeline.'));
            });

            it('should throw a new PipelineError if a Limit stage has already been added', () => {
                expect(
                    () => pipelineBuilderWithDebug
                        .Limit(10)
                        .Paging(1)
                ).toThrowError(new PipelineError('A Paging stage cannot be added if a Skip, Limit, or Count stage is already in the pipeline.'));
            });

            it('should throw a new PipelineError if a Count stage has already been added', () => {
                expect(
                    () => pipelineBuilderWithDebug
                        .Count("total")
                        .Paging(3, 8)
                ).toThrowError(new PipelineError('A Paging stage cannot be added if a Skip, Limit, or Count stage is already in the pipeline.'));
            });

        });

        describe('Stage Methods => addStage()', () => {

            it('should not add the stage to the pipeline if its value is invalid', () => {
                expect(() => pipelineBuilderWithDebug.addStage('match', undefined))
                    .toThrowError(new PipelineError('The match stage value is not valid.'));
            });

            it('should not add the stage to the pipeline if its payload is invalid', () => {
                expect(() => pipelineBuilderWithDebug.Lookup({ from: 'tests', as: 'unit', localField: 'expect' }))
                    .toThrowError(new PipelineError('The foreignField property is required when localfield is specified.'));
            });

            test.each([
                ['should add a stage to the pipeline', 'addFields',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .AddFields({ tests: 'unit' }),
                    { tests: 'unit' }],
                ['should add a stage to the pipeline', 'addFields',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .AddFields({ tests: 'unit' }, { test: 'unit' }),
                    { tests: 'unit', test: 'unit' }],

                ['should add a stage to the pipeline', 'bucket',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Bucket({groupBy: '$name', boundaries: ['a', 'l', 'z']}),
                    {groupBy: '$name', boundaries: ['a', 'l', 'z']}],
                ['should add a stage to the pipeline', 'bucketAuto',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .BucketAuto({ groupBy: '$age', buckets: 5 }), { groupBy: '$age', buckets: 5 }],
                ['should add a stage to the pipeline', 'collStats',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .CollStats(
                        { latencyStats: { histograms: false }, storageStats: { scale: 2 }, count: {}, queryExecStats: {} }
                    ), { latencyStats: { histograms: false }, storageStats: { scale: 2 }, count: {}, queryExecStats: {} }],
                ['should add a stage to the pipeline', 'count',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Count('testCount'), 'testCount'],
                ['should add a stage to the pipeline', 'facet',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Facet({ output1: [], output2: [] }), { output1: [], output2: [] }],
                ['should add a stage to the pipeline', 'geoNear',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .GeoNear({ near: [20, 5], distanceField: 'distance' }),
                    { near: [20, 5], distanceField: 'distance' }],
                ['should add a stage to the pipeline', 'graphLookup',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .GraphLookup(
                        { from: 'tests', startWith: [15,30,45], connectFromField:'testId', connectToField: 'id',
                            as: 'pts' }
                    ), { from: 'tests', startWith: [15,30,45], connectFromField:'testId', connectToField: 'id',
                    as: 'pts' }],
                ['should add a stage to the pipeline', 'group',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Group({ _id: 'unit', tests: { $push: 'num'} }),
                    { _id: 'unit', tests: { $push: 'num'} }],
                ['should add a stage to the pipeline', 'indexStats',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .IndexStats({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'limit',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Limit(200), 200],
                ['should add a stage to the pipeline', 'listSessions',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .ListSessions({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'lookup',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Lookup({ from: 'unit', as: 'test' }), { from: 'unit', as: 'test' }],
                ['should add a stage to the pipeline', 'match',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Match({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'merge',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Merge({ into: 'unit' }), { into: 'unit' }],
                ['should add a stage to the pipeline', 'out',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Out({ db: 'tests', coll: 'unit' }), { db: 'tests', coll: 'unit' }],
                ['should add a stage to the pipeline', 'planCacheStats',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .PlanCacheStats({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'project',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Project({ tests: 1 }), { tests: 1 }],
                ['should add a stage to the pipeline', 'redact',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Redact({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'replaceRoot',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .ReplaceRoot({ newRoot: { tests: 'unit' } }), { newRoot: { tests: 'unit' } }],
                ['should add a stage to the pipeline', 'replaceWith',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .ReplaceWith({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'sample',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Sample({ size: 3 }), { size: 3 }],
                ['should add a stage to the pipeline', 'search',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Search({ tests: 'unit' }), { tests: 'unit' }],

                ['should add a stage to the pipeline', 'set',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Set({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'set',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Set({ tests: 'unit' }, { test: 'unit' }), { tests: 'unit', test: 'unit' }],

                ['should add a stage to the pipeline', 'skip',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Skip(100), 100],

                ['should add a stage to the pipeline', 'sort',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Sort({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'sort',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Sort({ tests: 'unit' }, { test: 'unit' }), { tests: 'unit', test: 'unit' }],

                ['should add a stage to the pipeline', 'sortByCount',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .SortByCount({ tests: 'unit' }), { tests: 'unit' }],
                ['should add a stage to the pipeline', 'unionWith',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .UnionWith({ coll: 'unit' }), { coll: 'unit' }],

                ['should add a stage to the pipeline', 'unset',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Unset('toto'), 'toto'],
                ['should add a stage to the pipeline', 'unset',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Unset('toto', 'test', 'unit'), ['toto', 'test', 'unit']],

                ['should add a stage to the pipeline', 'unwind',
                    new PipelineBuilder(pipeLineName, { debug: true, logs: true})
                        .Unwind('$tests' ), '$tests'],

            ])('%s: $%s => %o', (
                nameTest: string,
                stageType: string,
                stageOperation: any,
                expectedValue: any
            ) => {
                // addFields => $addFields
                const expected = {
                    ['$' + stageType]: expectedValue
                };

                expect(stageOperation.getPipeline()[0]).toEqual(expected);
            });
        });
    });

    describe('pipeline Builder Without Debug', () => {
        const pipeLineName = 'builder-test2';
        beforeEach(() => {
            pipelineBuilderWithoutDebug = new PipelineBuilder(pipeLineName);
        });

        it('should throw a PipelineError if the pipeline is empty', () => {
            expect(
                () => pipelineBuilderWithoutDebug.getPipeline()
            ).toThrowError(new PipelineError('Error, ' + pipeLineName + ' pipeline is empty!'));
        });

        it('should throw a PipelineError if the stage value is invalid', () => {
            expect(
                () => pipelineBuilderWithoutDebug.Match(undefined).getPipeline()
            ).toThrowError(new PipelineError('1) The match stage value is not valid.'));
        });

        it('should throw a PipelineError if the stage payload is invalid', () => {
            expect(
                () => pipelineBuilderWithoutDebug.Lookup({ from: 'test', as: 'unit', localField: 'toto' }).getPipeline()
            ).toThrowError(new PipelineError('1) The foreignField property is required when localfield is specified.'));
        });

        it('should throw a PipelineError if the stage value or one of its element is not valid when calling toObject method', () => {
            expect(() => pipelineBuilderWithoutDebug.AddFields(
                    ["{ tests: 'unit' }"]
            )).toThrowError(new PipelineError('The AddFields stage value is not valid.'));
        });

        it('should throw a PipelineError if the stage value or one of its element is not valid when calling toObject method', () => {
            expect(() => pipelineBuilderWithoutDebug.AddFields(
                [{ tests: 'unit' }], { test: 'unit'}, {}, [{}]
            )).toThrowError(new PipelineError('3 fields of the AddFields stage are not valid.'));
        });
    });
});
