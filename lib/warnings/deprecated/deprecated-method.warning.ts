import {Warning} from "../model/warning";
/**
 * DeprecatedMethodWarning
 */
export class DeprecatedMethodWarning extends Warning {
    /**
     * constructor
     * @param oldMethod The deprecated method
     * @param newMethod The new method
     */
    constructor(oldMethod: string, newMethod: string) {
        super(`The ${oldMethod} method is deprecated, please use ${newMethod} instead.`);
    }
}
