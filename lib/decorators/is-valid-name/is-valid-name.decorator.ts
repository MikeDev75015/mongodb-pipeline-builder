import { PipelineError } from '../../errors';
import { testMaxLength, testMinLength, testNoSpace, testNoSpecialChar } from '../../validators';

/**
 * IsValidName property decorator
 * @param options
 * @constructor
 */
export function IsValidName(options?: {
  minLength?: number,
  maxLength?: number,
  noSpace?: boolean,
  noSpecialChar?: boolean
}) {
  return (target: object, propertyKey: string) => {
    let value: string;
    const getter = () => value;
    const setter = (newVal: string) => {
      const errorList: string[] = [];
      const isEmptyString = !newVal.replace(/ /g, '').length;

      if (isEmptyString) {
        errorList.push(`${errorList.length + 1}. The pipeline name cannot be an empty string.`);
      }

      if (!isEmptyString && options) {
        Object.keys(options).forEach(key => {
          switch (key) {
            case 'minLength':
              testMinLength(newVal, options.minLength as number, errorList);
              break;
            case 'maxLength':
              testMaxLength(newVal, options.maxLength as number, errorList);
              break;
            case 'noSpace':
              testNoSpace(newVal, errorList);
              break;
            case 'noSpecialChar':
              testNoSpecialChar(newVal, errorList);
              break;
            default:
              errorList.push(`${errorList.length + 1}. Unknown ${key} decorator option key.`);
          }
        });
      }

      if (errorList.length) {
        throw new PipelineError(errorList.join('\n'));
      } else {
        value = newVal.trim();
      }
    };

    const descriptor = {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    };

    return Object.defineProperty(target, propertyKey, descriptor);
  };
}


