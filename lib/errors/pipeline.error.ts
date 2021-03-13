export class PipelineError extends Error {
    name = 'PipelineError';

    constructor(message?: string) {
        super(message ? message : 'An error occurred while building the pipeline.');
    }
}
