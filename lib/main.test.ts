import { PipelineBuilder } from "./";
import { PipelineError } from "./errors";
import {LookupStageInterface} from "./interfaces";

describe('should create a new pipeline builder object', () => {
    let
        pipelineBuilderWithDebug: PipelineBuilder,
        pipelineBuilderWithoutDebug: PipelineBuilder;

    describe('pipeline Builder With Debug', () => {
        const pipeLineName = 'builder-test';
        beforeEach(() => {
            pipelineBuilderWithDebug = new PipelineBuilder(pipeLineName, { debug: true, logsEnabled: true});
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
            const testPayload = { name: 'toto' };
            test.each([
                ['should add a stage to the pipeline', 'addFields',
                    [{ name: 'toto' }], { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'addFields',
                    [{ name: 'toto' }, { test: 'unit' }], { name: 'toto', test: 'unit' }, '' ],

                ['should add a stage to the pipeline', 'bucket', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'bucketAuto', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'collStats', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'count', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'facet', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'geoNear', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'graphLookup', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'group', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'indexStats', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'limit', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'listSessions', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'lookup', { from: 'unit', as: 'test' }, { from: 'unit', as: 'test' }, '' ],
                ['should add a stage to the pipeline', 'match', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'merge', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'out', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'planCacheStats', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'project', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'redact', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'replaceRoot', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'replaceWith', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'sample', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'search', { name: 'toto' }, { name: 'toto' }, '' ],

                ['should add a stage to the pipeline', 'set',
                    [{ name: 'toto' }], { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'set',
                    [{ name: 'toto' }, { test: 'unit' }], { name: 'toto', test: 'unit' }, '' ],

                ['should add a stage to the pipeline', 'skip', { name: 'toto' }, { name: 'toto' }, '' ],

                ['should add a stage to the pipeline', 'sort',
                    [{ name: 'toto' }], { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'sort',
                    [{ name: 'toto' }, { test: 'unit' }], { name: 'toto', test: 'unit' }, '' ],

                ['should add a stage to the pipeline', 'sortByCount', { name: 'toto' }, { name: 'toto' }, '' ],
                ['should add a stage to the pipeline', 'unionWith', { name: 'toto' }, { name: 'toto' }, '' ],

                ['should add a stage to the pipeline', 'unset', ['toto'], 'toto', '' ],
                ['should add a stage to the pipeline', 'unset', ['toto', 'test', 'unit'], ['toto', 'test', 'unit'], '' ],

                ['should add a stage to the pipeline', 'unwind', { name: 'toto' }, { name: 'toto' }, '' ],

                [
                    'should not add the stage to the pipeline if its value is invalid',
                    'Match',
                    undefined,
                    undefined,
                    'The match stage value is not valid.'
                ],
                [
                    'should not add the stage to the pipeline if its value is invalid',
                    'Lookup',
                    { name: 'toto' },
                    undefined,
                    'The from and as properties are required'
                ],
            ])('%s: $%s => %o', (
                nameTest: string,
                stageType: string,
                stageValue: any | any[],
                expectedValue: any,
                errorMessage: string
            ) => {
                // addFields => AddFields
                const method = stageType.charAt(0).toUpperCase() + stageType.substr(1);
                // addFields => $addFields
                const expected = {
                    ['$' + stageType]: expectedValue
                };

                if (errorMessage) {
                    // @ts-ignore
                    expect(() => pipelineBuilderWithDebug[method](
                        stageValue
                    )).toThrowError(new PipelineError(errorMessage));
                } else {
                    // @ts-ignore
                    const operation = ['addFields', 'set', 'sort', 'unset'].includes(stageType) ? pipelineBuilderWithDebug[method](...stageValue) : pipelineBuilderWithDebug[method](stageValue);

                    expect(operation.getPipeline()[0]).toEqual(expected);
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
                    ["{ name: 'toto' }"]
            )).toThrowError(new PipelineError('The AddFields stage value is not valid.'));
        });

        it('should throw a PipelineError if the stage value or one of its element is not valid when calling toObject method', () => {
            expect(() => pipelineBuilderWithoutDebug.AddFields(
                [{ name: 'toto' }], { test: 'unit'}, {}, [{}]
            )).toThrowError(new PipelineError('3 fields of the AddFields stage are not valid.'));
        });
    });
});
