import {Warning} from "./warning";

describe('Warning', () => {
    let warning: Warning;
    let spyConsole: any;

    beforeEach(() => {
        spyConsole = jest.spyOn(console, 'warn');
    });

    it('should be defined with "There is a new way to perform this action." as default Warning message', () => {
        warning = new Warning();
        expect(warning).toBeDefined();
        expect(spyConsole).toHaveBeenCalledTimes(1);
        expect(spyConsole).toHaveBeenCalledWith(`${warning.name}: There is a new way to perform this action.`);
    });

    it('should be defined with a custom Warning message', () => {
        warning = new Warning('custom Warning');
        expect(warning).toBeDefined();
        expect(spyConsole).toHaveBeenCalledTimes(1);
        expect(spyConsole).toHaveBeenCalledWith(`${warning.name}: custom Warning`);
    });
});
