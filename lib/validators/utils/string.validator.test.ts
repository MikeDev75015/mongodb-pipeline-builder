import {testMaxLength, testMinLength, testNoSpace, testNoSpecialChar} from "./string.validator";

const validators: any = {
    testMinLength: testMinLength,
    testMaxLength: testMaxLength,
    testNoSpace: testNoSpace,
    testNoSpecialChar: testNoSpecialChar
};

describe('string validators', () => {
    describe('testMinLength', () => {
        let errors: string[];
        beforeEach(() => errors = []);

        test.each([

            ['testMinLength', ['toto_1', 4], []],
            ['testMinLength', ['toto_1', 5],
                ['1. The pipeline name must have at least 5 character(s).']],

            ['testMaxLength', ['toto_1', 4], []],
            ['testMaxLength', ['toto-test_1', 5],
                ['1. The pipeline name must have a maximum of 5 character(s).']],

            ['testNoSpace', ['toto_1'], []],
            ['testNoSpace', ['toto test_1'],
                ['1. The pipeline name cannot contain spaces.']],

            ['testNoSpecialChar', ['toto_1'], []],
            ['testNoSpecialChar', ['toto+test_1'],
                ['1. The pipeline name cannot contain any special character(s) except "-" or "_".']],

        ])('%s with %o arguments should return %o', (
            testFunction: any,
            testParameters: any[],
            expected: string[]
        ) => {
            validators[testFunction](...testParameters, errors);
            expect(errors).toEqual(expected);
        });
    });
});
