import { Timezone } from './date-unit';
import { FilePath } from './file-path';
import { GeoJSON } from './geo-json';
import { OperatorExpression } from './pipeline-operator';
import { SystemVariable } from './pipeline-system-variables';

export type StringExpression = FilePath | OperatorExpression | string;

export type NumericExpression = FilePath | OperatorExpression | number;

export type ArrayExpression<T = any> = FilePath | OperatorExpression | T[];

export type BooleanExpression = FilePath | OperatorExpression | object | boolean;

export type DateExpression = FilePath | OperatorExpression | NumericExpression | Date;

export type ObjectExpression<T = any> = FilePath | OperatorExpression | { [p: string]: T } | object;

export type FunctionExpression = FilePath | OperatorExpression | ((...args: any[]) => any);

export type TimeZoneExpression = StringExpression | Timezone;

export type RegExpExpression =
  RegExp
  | `/${string}/`
  | `/${string}/${'i' | 'm' | 'x' | 's'}`;

export type RegExpOptionsExpression = `${'i' | 'm' | 'x' | 's'}`;

export type GeoJSONExpression = FilePath | OperatorExpression | GeoJSON;

export type Expression =
  FilePath
  | SystemVariable
  | { [key: string]: any }
  | OperatorExpression
  | string
  | number
  | boolean
  | null
  | undefined
  | RegExp
  | Date
  | ArrayExpression
  | StringExpression
  | NumericExpression
  | BooleanExpression
  | ObjectExpression
  | FunctionExpression;
