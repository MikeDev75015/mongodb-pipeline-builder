import { PipelineBuilder } from './main';

describe('should create a new pipeline builder object', () => {
    let pipelineBuilder: PipelineBuilder;

    beforeEach(() => {
        pipelineBuilder = new PipelineBuilder('test-the-builder');
    });

    describe('getName()', () => {
        it('should return the pipeline builder name passed in the constructor', () => {
            expect(pipelineBuilder.getName()).toEqual('test-the-builder');
        });
    });

    describe('showDebug()', () => {
        pipelineBuilder.showDebug();
        expect(pipelineBuilder)
    });

});
