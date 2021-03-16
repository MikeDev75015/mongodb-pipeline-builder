// Trigonometry Expression Operators
// Trigonometry expressions perform trigonometric operations on numbers.
// Values that represent angles are always input or output in radians. Use $degreesToRadians and $radiansToDegrees
// to convert between degree and radian measurements.

export const Sin = (expression: any) => ({ $sin: expression });
export const Cos = (expression: any) => ({ $cos: expression });
export const Tan = (expression: any) => ({ $tan: expression });
export const Asin = (expression: any) => ({ $asin: expression });
export const Acos = (expression: any) => ({ $acos: expression });
export const Atan = (expression: any) => ({ $atan: expression });
export const Atan2 = (expression1: any, expression2: any) => ({ $atan2: [ expression1, expression2 ] });
export const Asinh = (expression: any) => ({ $asinh: expression });
export const Acosh = (expression: any) => ({ $acosh: expression });
export const Atanh = (expression: any) => ({ $atanh: expression });
export const Sinh = (expression: any) => ({ $sinh: expression });
export const Cosh = (expression: any) => ({ $cosh: expression });
export const Tanh = (expression: any) => ({ $tanh: expression });
export const DegreesToRadians = (expression: any) => ({ $degreesToRadians: expression });
export const RadiansToDegrees = (expression: any) => ({ $radiansToDegrees: expression });
