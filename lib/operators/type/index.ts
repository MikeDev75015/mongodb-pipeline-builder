// Type Expression Operators

export const Convert = (input: any, to: any, onError?: any, onNull?: any) => ({
    $convert:
        {
            input: input,
            to: to,
            onError: onError,  // Optional.
            onNull: onNull    // Optional.
        }
});
export const IsNumber = (expression: any) => ({ $isNumber: expression });
export const ToBool = (expression: any) => ({ $toBool: expression });
export const ToDecimal = (expression: any) => ({ $toDecimal: expression });
export const ToDouble = (expression: any) => ({ $toDouble: expression });
export const ToInt = (expression: any) => ({ $toInt: expression });
export const ToLong = (expression: any) => ({ $toLong: expression });
export const ToObjectId = (expression: any) => ({ $toObjectId: expression });
export const Type = (expression: any) => ({ $type: expression });
