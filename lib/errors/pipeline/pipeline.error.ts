/**
 * PipelineError
 */
export class PipelineError extends Error {
  /**
   * name
   */
  name = 'PipelineError';

  /**
   * constructor
   * @param message
   */
  constructor(message = 'An error occurred while building the pipeline.') {
    super(message);
    this.name = PipelineError.name;
  }
}
