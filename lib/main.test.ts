import { PipelineBuilder } from "./";
import { PipelineError } from "./errors";

describe('should create a new pipeline builder object', () => {
    let
        pipelineBuilderWithDebug: PipelineBuilder,
        pipelineBuilderWithoutDebug: PipelineBuilder;

    describe('pipeline Builder With Debug', () => {
        const pipeLineName = 'builder-test';
        beforeEach(() => {
            pipelineBuilderWithDebug = new PipelineBuilder(pipeLineName, true, true);
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
                expect(pipelineBuilderWithDebug.enableDebug()).toBeTruthy();
            });
        });

        describe('disableDebug()', () => {
            it('should disable the builder debug', () => {
                expect(pipelineBuilderWithDebug.disableDebug()).toBeFalsy();
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

        describe('Stage Method() => addStage()', () => {
            test.each([
                ['should add a stage to the pipeline', 'addFields', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'bucket', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'bucketAuto', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'collStats', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'count', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'facet', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'geoNear', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'graphLookup', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'group', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'indexStats', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'limit', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'listSessions', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'lookup', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'match', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'merge', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'out', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'planCacheStats', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'project', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'redact', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'replaceRoot', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'replaceWith', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'sample', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'search', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'set', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'skip', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'sort', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'sortByCount', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'unionWith', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'unset', { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'unwind', { name: 'toto' }, '' ],

                [
                    'should not add the stage to the pipeline if its value is invalid',
                    'Match',
                    undefined,
                    'Impossible to add the stage, its value is not valid!'
                ],
            ])('%s: $%s => %o', (
                nameTest: string,
                stageType: string,
                stageValue: any,
                errorMessage: string
            ) => {
                // addFields => AddFields
                const method = stageType.charAt(0).toUpperCase() + stageType.substr(1);
                const expected = {
                    ['$' + stageType]: stageValue
                };

                if (errorMessage) {
                    // @ts-ignore
                    expect(() => pipelineBuilderWithDebug[method](
                        stageValue
                    )).toThrowError(new PipelineError(errorMessage));
                } else {
                    // @ts-ignore
                    expect(pipelineBuilderWithDebug[method](
                        stageValue
                    ).getPipeline()).toEqual([expected]);
                }
            });
        });
    });

    describe('pipeline Builder Without Debug', () => {
        const pipeLineName = 'builder-test2';
        beforeEach(() => {
            process.env.LOGS_ENABLED = 'false';
            pipelineBuilderWithoutDebug = new PipelineBuilder(pipeLineName);
        });

        it('should throw a PipelineError if the pipeline is empty', () => {
            expect(
                () => pipelineBuilderWithoutDebug.getPipeline()
            ).toThrowError(new PipelineError('Error, ' + pipeLineName + ' pipeline is empty!'));
        });

        it('should throw a PipelineError if the stage is invalid or not yet treated', () => {
            expect(
                () => pipelineBuilderWithoutDebug.Match(undefined).getPipeline()
            ).toThrowError(new PipelineError('1) The match stage value is not valid.'));
        });
    });
});
