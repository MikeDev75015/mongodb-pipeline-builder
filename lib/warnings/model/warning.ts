/**
 * Model for usage warnings
 */
export class Warning {
    /**
     * default name
     */
    name = 'Warning';

    /**
     * constructor
     * @param message
     */
    constructor(
        message = 'There is a new way to perform this action.'
    ) {
        console.warn(`${this.name}: ${message}`);
    }
}
