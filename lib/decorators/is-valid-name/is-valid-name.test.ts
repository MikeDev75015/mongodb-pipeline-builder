import {IsValidName} from "./is-valid-name";
import {PipelineError} from "../../errors";

class TestDecorator {
    @IsValidName({
        minLength: 4,
        maxLength: 8,
        noSpace: true,
        noSpecialChar: true,
    })
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class TestDecorator2 {
    @IsValidName({
        test: 4,
    } as unknown as {})
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}

describe('decorators', () => {
    describe('IsValidName', () => {

        it('should throw errors if an option key is unknown', () => {
            expect(() => new TestDecorator2('unit')).toThrowError(
                new PipelineError('1. Unknown test decorator option key.')
            );
        });

        it('should throw errors if the pipeline name is empty', () => {
            expect(() => new TestDecorator('')).toThrowError(
                new PipelineError('1. The pipeline name cannot be an empty string.')
            );
        });

        it('should throw errors if the pipeline name is lower than min length', async () => {
            expect(() => new TestDecorator('too')).toThrowError(
                new PipelineError('1. The pipeline name must have at least 4 character(s).')
            );
        });

        it('should throw errors if the pipeline name is bigger than max length', async () => {
            expect(() => new TestDecorator('maxi-pipeline-name')).toThrowError(
                new PipelineError('1. The pipeline name must have a maximum of 8 character(s).')
            );
        });

        it('should throw errors if the pipeline name contain spaces', async () => {
            expect(() => new TestDecorator('sp ace')).toThrowError(
                new PipelineError('1. The pipeline name cannot contain spaces.')
            );
        });

        it('should throw errors if the pipeline name contain special char(s)', async () => {
            expect(() => new TestDecorator('$test')).toThrowError(
                new PipelineError('1. The pipeline name cannot contain any special character(s) except "-" or "_".')
            );
        });
    });
});
