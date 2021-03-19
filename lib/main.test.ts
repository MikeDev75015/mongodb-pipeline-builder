import { PipelineBuilder } from "./";
import { PipelineError } from "./errors";
import {RegexMatch} from "./operators/string";

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

        describe('lookup()', () => {
            it('should throw a PipelineError if the value is invalid', () => {
                expect(
                    () => pipelineBuilderWithDebug.Lookup(undefined)
                ).toThrowError(new PipelineError('Impossible to add the stage, the value is not valid!'));
            });

            it('should add a $lookup stage to the pipeline', () => {
                pipelineBuilderWithDebug.Lookup({ from: 'from', as: 'as' });
                expect(
                    pipelineBuilderWithDebug.getPipeline()
                ).toEqual([{ $lookup: { from: 'from', as: 'as' } }]);
            });
        });

        describe('match()', () => {
            it('should throw a PipelineError if the value is invalid', () => {
                expect(
                    () => pipelineBuilderWithDebug.Match(undefined)
                ).toThrowError(new PipelineError('Impossible to add the stage, the value is not valid!'));
            });

            it('should add a $match stage to the pipeline', () => {
                pipelineBuilderWithDebug.Match('test');
                expect(
                    pipelineBuilderWithDebug.getPipeline()
                ).toEqual([{ $match: 'test' }]);
            });
        });

        describe('project()', () => {
            it('should throw a PipelineError if the value is invalid', () => {
                expect(
                    () => pipelineBuilderWithDebug.Project(undefined)
                ).toThrowError(new PipelineError('Impossible to add the stage, the value is not valid!'));
            });

            it('should add a $project stage to the pipeline', () => {
                pipelineBuilderWithDebug.Project({ unit: 'test' });
                expect(
                    pipelineBuilderWithDebug.getPipeline()
                ).toEqual([{ $project: { unit: 'test' } }]);
            });
        });

        describe('addStage()', () => {
            test.each([
                [
                    'should add a stage to the pipeline',
                    'match',
                    { name: 'toto' },
                    { $match: { name: 'toto' } },
                    ''
                ],
                [
                    'should not add the stage to the pipeline if its type is invalid or not yet treated',
                    'toto',
                    RegexMatch('$name', /toto/g),
                    null,
                    'Impossible to add the stage, the stage name is not valid!'
                ],
            ])('%s', (
                nameTest: string,
                stageType: string,
                stageValue: any,
                expected: any,
                errorMessage: string
            ) => {
                if (errorMessage) {
                    expect(() => pipelineBuilderWithDebug.addStage(
                        stageType as 'addFields' | 'match' | 'lookup' | 'project' | 'unset' | 'sort' | 'count' | 'skip' | 'limit',
                        stageValue
                    )).toThrowError(new PipelineError(errorMessage));
                } else {
                    expect(pipelineBuilderWithDebug.addStage(
                        stageType as 'addFields' | 'match' | 'lookup' | 'project' | 'unset' | 'sort' | 'count' | 'skip' | 'limit',
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
            const stageType = 'toto';
            const stageValue = RegexMatch('$name', /toto/g);

            expect(
                () => pipelineBuilderWithoutDebug.addStage(stageType as 'match', stageValue).getPipeline()
            ).toThrowError(new PipelineError('1) the toto stage type is invalid or not yet treated.'));
        });
    });
});
