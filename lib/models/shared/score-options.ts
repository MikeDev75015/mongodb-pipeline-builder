import { ObjectExpression } from '../core/expression';

type ScoreBoostValue = {
  /**
   * Number to multiply the default base score by. Value must be a positive number. Either value or path is required,
   * but you can't specify both.
   */
  value: number;
};

type ScoreBoostPath = {
  /**
   * Name of the numeric field whose value to multiply the default base score by. Either path or value is required, but
   * you can't specify both.
   */
  path: string;
};

export type ScoreBoost = {
  /**
   * The boost option multiplies a result's base score by a given number or the value of a numeric field in the
   * documents. For example, you can use boost to increase the importance of certain matching documents in the result.
   *
   * Note
   * You can't use the boost and constant options together.
   *
   * The boost option with path is the same as multiplying using the function option with a path expression.
   */
  boost: (ScoreBoostValue | ScoreBoostPath) & {
    /**
     * Numeric value to substitute for path if the numeric field specified through path is not found in the documents.
     * If omitted, defaults to 0. You can specify this only if you specify path.
     */
    undefined?: number;
  };
};

export type ScoreConstant = {
  /**
   * The constant option replaces the base score with a specified number.
   */
  constant: {
    value: number;
  };
};

export type ScoreEmbedded = {
  aggregate?: 'sum' | 'maximum' | 'minimum' | 'mean';
  outerScore?: ScoreOptions;
};

type ScoreFunctionArithmetic = {
  /**
   * Adds a series of numbers. Takes an array of expressions, which can have negative values. Array length must be
   * greater than or equal to 2.
   *
   * Example
   * Arithmetic Expression Syntax
   * "function": {
   *   "add": [
   *     {"path": "rating"},
   *     {"score": "relevance"}
   *   ]
   * }
   * Atlas Search uses the path and score expressions to add the following:
   *
   * Numeric value of the rating field or 0, if the rating field is not present in the document
   *
   * Relevance score, which is the score Atlas Search assigns based on relevance
   */
  add?: ObjectExpression[];
  /**
   * Multiplies a series of numbers. Takes an array of expressions, which can have negative values. Array length must
   * be greater than or equal to 2.
   *
   * Example
   * Arithmetic Expression Syntax
   * "function": {
   *   "multiply": [
   *     {
   *       "path": {
   *         "value": "popularity",
   *         "undefined": 2.5
   *       }
   *     },
   *     {"score": "relevance"},
   *     {"constant": 0.75}
   *   ]
   * }
   * Atlas Search uses the path, score, and constant expressions to alter the final score of the document. It
   * multiplies the following:
   *
   * Numeric value of the path expression, which is the numeric value of the popularity field or 2.5, if the popularity
   * field is not present in the document
   *
   * Relevance score, which is the score Atlas Search assigns based on relevance
   *
   * Constant value of 0.75
   */
  multiply?: ObjectExpression[];
};

type ScoreFunctionConstant = {
  /**
   * Number that indicates a fixed value. Atlas Search supports negative values.
   */
  constant: number;
};

type ScoreFunctionPath = {
  /**
   * Name of numeric field. Field can contain negative numeric values.
   */
  value: string;
  /**
   * Value to use if the numeric field specified using value is missing in the document. If omitted, defaults to 0.
   */
  undefined?: number;
};

type ScoreFunctionScore = {
  /**
   * Value of relevance score of the query. Value must be relevance.
   */
  score: string;
};

type ScoreFunctionUnary = {
  /**
   * Calculates the log10 of a number.
   *
   * Example
   * The following example uses the arithmetic expression multiply option. Atlas Search calculates the log10 of the
   * arithmetic expression.
   *
   * Unary Expression Syntax
   * {
   *   "function": {
   *     "log": {
   *       "multiply": [
   *         {"path": "popularity"},
   *         {"constant": 0.5},
   *         {"score": "relevance"}
   *       ]
   *     }
   *   }
   * }
   * If the specified expression evaluates to less than or equal to 0, then the log evaluates to undefined.
   *
   * Example
   * In the following example, log10 of -5.1, specified using a constant expression, evaluates to undefined. Therefore,
   * the final score of the document is 0.
   *
   * Unary Expression Syntax
   * {
   *   "function": {
   *     "log": {
   *       "constant": -5.1
   *     }
   *   }
   * }
   */
  log?: ScoreExpressions;
  /**
   * Adds 1 to the number and then calculates its log10. For example:
   *
   * Example
   * The following example uses the path expression. Atlas Search adds 1 to the numeric value of the path expression
   * and then calculates the log10.
   *
   * Unary Expression Syntax
   * {
   *   "function": {
   *     "log1p": {
   *       "path": {
   *         "value": "rating",
   *         "undefined": 4
   *       }
   *     }
   *   }
   * }
   */
  log1p?: ScoreExpressions;
};

type ScoreFunctionGaussian = {
  /**
   * Rate at which you want to multiply the scores. Value must be a positive number between 0 and 1 exclusive. If
   * omitted, defaults to 0.5.
   *
   * For documents whose numeric field value (specified using path) is at a distance (specified using scale) away from
   * origin plus or minus (±) offset, Atlas Search multiplies the current score using decay.
   */
  decay?: number;
  /**
   * Number to use to determine the distance from origin. The decay operation is performed only for documents whose
   * distances are greater than origin plus or minus (±) offset. If ommitted, defaults to 0.
   */
  offset?: number;
  /**
   * Point of origin from which to calculate the distance.
   */
  origin: number;
  /**
   * Name of the numeric field whose value you want to use to multiply the base score.
   */
  path: ScoreExpressions;
  /**
   * Distance from origin plus or minus (±) offset at which scores must be multiplied.
   */
  scale: number;
};

export type ScoreFunction = {
  /**
   * The function option allows you to alter the final score of the document using a numeric field . You can specify
   * the numeric field for computing the final score through an expression. If the final result of the function score
   * is less than 0, Atlas Search replaces the score with 0.
   *
   * Note
   * You can use function inside the score option of the embeddedDocument operator's operator. However, for function
   * score expressions that require the path option, the numeric field that you specify as the path for the expression
   * must be inside the embeddedDocument operator's path.
   *
   * Expressions
   * Use the following expressions with the function option to alter the final score of the document:
   *
   * Arithmetic expressions, which add or multiply a series of numbers.
   *
   * Constant expressions, which allow a constant number in the function score.
   *
   * Gaussian decay expressions, which decay, or reduces, the scores by multiplying at a specified rate.
   *
   * Path expressions, which incorporate an indexed numeric field value into a function score.
   *
   * Score expressions, which return the relevance score assigned by Atlas Search.
   *
   * Unary expressions, which are expressions that take a single argument. In Atlas Search, you can calculate the
   * log10(x) or log10(x+1) of a specified number.
   */
  function: ScoreExpressions;
};

type ScoreExpressions = ScoreFunctionArithmetic
  | ScoreFunctionConstant
  | ScoreFunctionGaussian
  | ScoreFunctionPath
  | ScoreFunctionScore
  | ScoreFunctionUnary;

export type ScoreOptions = ScoreBoost | ScoreConstant | ScoreEmbedded | ScoreFunction;
