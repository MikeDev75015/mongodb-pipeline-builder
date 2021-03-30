import {PipelineError} from "../errors";

export function IsValidName(options?: {
    minLength?: number,
    maxLength?: number,
    noSpace?: boolean,
    noSpecialChar?: boolean
}) {
    return function (target: Object, propertyKey: string) {
        let value: string;
        const getter = () => value;
        const setter = (newVal: string) => {
            const errorList: string[] = [];

            if (!newVal.replace(/ /g, '').length) {
                errorList.push(`${errorList.length + 1}. The pipeline name cannot be an empty string.`);
            }

            if (options) {
                const { minLength, maxLength, noSpace, noSpecialChar } = options;

                if (minLength !== undefined && newVal.length < minLength) {
                    errorList.push(`${errorList.length + 1}. The pipeline name must have at least ${minLength} character(s).`);
                }

                if (maxLength !== undefined && newVal.length < maxLength) {
                    errorList.push(`${errorList.length + 1}. The pipeline name must have a maximum of ${maxLength} character (s).`);
                }

                if (noSpace && newVal.match(/ /g)) {
                    errorList.push(`${errorList.length + 1}. The pipeline name cannot contain spaces.`);
                }

                if (noSpecialChar && !newVal.match(/^[\w\-]+$/g)) {
                    errorList.push(`${errorList.length + 1}. The pipeline name cannot contain any special character(s) except "-" or "_".`);
                }
            }

            if (errorList.length) {
                throw new PipelineError(errorList.join('\n'));
            }

            value = newVal.trim();
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}
