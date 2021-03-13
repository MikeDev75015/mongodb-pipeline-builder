import { PipelineBuilder } from './main';

describe('should create a new pipeline builder object', () => {
    let pipelineBuilder: PipelineBuilder;

    beforeEach(() => {
        pipelineBuilder = new PipelineBuilder('test-the-builder');
    });

    it('should be defined', () => {
        expect(pipelineBuilder).toBeDefined();
    });

    describe('getName()', () => {
        it('should return the pipeline builder name passed in the constructor', () => {
            expect(pipelineBuilder.getName()).toEqual('test-the-builder');
        });
    });

    describe('enableDebug()', () => {
        it('should enable the builder debug', () => {
            expect(pipelineBuilder.enableDebug()).toBeTruthy();
        });
    });

    describe('disableDebug()', () => {
        it('should disable the builder debug', () => {
            expect(pipelineBuilder.disableDebug()).toBeFalsy();
        });
    });

    describe('reset()', () => {
        it('should return pipeline reset', () => {
            expect(pipelineBuilder.resetPipeline()).toEqual([]);
        });
    });

    describe('getDebugActionList()', () => {
        it('should return the action stored in the debug history list at builder initialization', () => {
            const debugActionList = pipelineBuilder.getDebugActionList();
            expect(debugActionList).toHaveLength(1);
            expect(debugActionList.map(d => d.action)).toEqual(['constructor']);
        });
    });

});
