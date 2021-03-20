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
    constructor(message?: string) {
        super(message ? message : 'An error occurred while building the pipeline.');
    }
}
