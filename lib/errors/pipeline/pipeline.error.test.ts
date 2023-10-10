import { PipelineError } from './pipeline.error';

describe('IllegalArgumentError', () => {
  let error: PipelineError;

  it('should be defined with "An error occurred while building the pipeline." as default Error message', () => {
    error = new PipelineError();
    expect(error).toBeDefined();
    expect(error.message).toEqual('An error occurred while building the pipeline.');

  });

  it('should be defined with a custom Error message', () => {
    error = new PipelineError('Error message');
    expect(error).toBeDefined();
    expect(error.message).toEqual('Error message');
  });
});
