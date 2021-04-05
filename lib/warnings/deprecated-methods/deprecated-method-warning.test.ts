import {deprecatedMethodWarning} from "./deprecated-method-warning";

describe('deprecatedMethodWarning', () => {
    let warning: any;
    let spyConsole: any;

    beforeEach(() => {
        spyConsole = jest.spyOn(console, 'warn');
    });

    it('should be defined with a deprecated method Warning message', () => {
        warning = deprecatedMethodWarning('OldRef', 'NewRef');
        expect(spyConsole).toHaveBeenCalledTimes(1);
        expect(spyConsole).toHaveBeenCalledWith(`Warning: The OldRef method is deprecated and will be removed in the future version, please use NewRef instead.`);
    });
});
