import {DeprecatedMethodWarning} from "./deprecated-method.warning";

describe('DeprecatedMethodWarning', () => {
    let warning: DeprecatedMethodWarning;
    let spyConsole: any;

    beforeEach(() => {
        spyConsole = jest.spyOn(console, 'warn');
    });

    it('should be defined with a deprecated method Warning message', () => {
        warning = new DeprecatedMethodWarning('OldRef', 'NewRef');
        expect(warning).toBeDefined();
        expect(spyConsole).toHaveBeenCalledTimes(1);
        expect(spyConsole).toHaveBeenCalledWith(`${warning.name}: The OldRef method is deprecated, please use NewRef instead.`);
    });
});
