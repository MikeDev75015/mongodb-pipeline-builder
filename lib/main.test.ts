import { PipelineBuilder } from "./";
import { PipelineError } from "./errors";
import {Equal, Expr, RegexMatch} from "./operators";

describe('should create a new pipeline builder object', () => {
    let
        pipelineBuilderWithDebug: PipelineBuilder,
        pipelineBuilderWithoutDebug: PipelineBuilder;

    describe('pipeline Builder With Debug', () => {
        const pipeLineName = 'builder-test';
        beforeEach(() => {
            pipelineBuilderWithDebug = new PipelineBuilder(pipeLineName, undefined, true);
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
                expect(debugActionList[0].action).toEqual('constructor');
            });
        });

        describe('addStage()', () => {
            test.each([
                [
                    'should add a stage to the pipeline',
                    'match',
                    Expr(Equal('$test', 'test')),
                    { $match: Expr(Equal('$test', 'test')) },
                    undefined
                ],
                [
                    'should not add the stage to the pipeline if its type is invalid or not yet treated',
                    'toto',
                    RegexMatch('$name', /toto/g),
                    { $toto: RegexMatch('$name', /(toto)/g) },
                    '1) the toto stage type is invalid or not yet treated.'
                ],
            ])('%s', (
                nameTest: string,
                stageType: 'addFields' | 'match' | 'lookup' | 'project' | 'unset' | 'sort' | 'count' | 'skip' | 'limit',
                stageValue: any,
                expected: any,
                errorMessage: string
            ) => {
                pipelineBuilderWithDebug.addStage(
                    stageType,
                    stageValue
                );

                if (!errorMessage) expect(pipelineBuilderWithDebug.getPipeline()).toEqual([expected]);
                else expect(() => pipelineBuilderWithDebug.getPipeline()).toThrowError(new PipelineError(errorMessage));
            });
        });
    });

    describe('pipeline Builder Without Debug', () => {
        const pipeLineName = 'builder-test2';
        beforeEach(() => {
            process.env.LOGS_ENABLED = 'false';
            pipelineBuilderWithoutDebug = new PipelineBuilder(pipeLineName, false);
        });

        it('should throw an error', () => {
            expect(
                () => pipelineBuilderWithoutDebug.getPipeline()
            ).toThrowError(new PipelineError('Error, ' + pipeLineName + ' pipeline is empty!'));
        });
    });


});
