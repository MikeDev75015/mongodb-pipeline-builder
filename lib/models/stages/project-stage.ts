import { FilePath } from '../core/file-path';
import { OperatorExpression } from '../core/pipeline-operator';

export type ProjectValue = 0 | 1 | false | true | OperatorExpression | FilePath | { [field: string]: ProjectValue };

export type ProjectStage = { [field: string]: ProjectValue };
