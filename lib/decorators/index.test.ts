import {IsValidName} from "./index";

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
        let spy: any;

        beforeEach(() => {
            spy = jest.spyOn(console, 'error');
        });

        it('should throw errors if an option key is unknown', () => {
            new TestDecorator2('unit');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('1. Unknown test decorator option key.');

        });

        it('should throw errors if the pipeline name is empty', () => {
            new TestDecorator('');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('1. The pipeline name cannot be an empty string.');

        });

        it('should throw errors if the pipeline name is lower than min length', async () => {
            new TestDecorator('too');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('1. The pipeline name must have at least 4 character(s).');
        });

        it('should throw errors if the pipeline name is bigger than max length', async () => {
            new TestDecorator('maxi-pipeline-name');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('1. The pipeline name must have a maximum of 8 character (s).');
        });

        it('should throw errors if the pipeline name contain spaces', async () => {
            new TestDecorator('sp ace');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('1. The pipeline name cannot contain spaces.');
        });

        it('should throw errors if the pipeline name contain special char(s)', async () => {
            new TestDecorator('$test');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('1. The pipeline name cannot contain any special character(s) except "-" or "_".');
        });
    });
});
