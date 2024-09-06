import { NumericExpression, ObjectExpression, StringExpression } from '../core/expression';
import { MayBeArray } from '../core/may-be-array';

/**
 * GraphLookup Stage Interface
 */
export type GraphLookupStage = {
  /**
   * Target collection for the $graphLookup operation to search, recursively matching the connectFromField to the
   * connectToField. The from collection cannot be sharded and must be in the same database as any other collections
   * used in the operation.
   */
  from: string;
  /**
   * Expression that specifies the value of the connectFromField with which to start the recursive search. Optionally,
   * startWith may be array of values, each of which is individually followed through the traversal process.
   */
  startWith: MayBeArray<StringExpression>;
  /**
   * Field name whose value $graphLookup uses to recursively match against the connectToField of other documents in
   * the collection. If the value is an array, each element is individually followed through the traversal process.
   */
  connectFromField: MayBeArray<StringExpression>;
  /**
   * Field name in other documents against which to match the value of the field specified by the connectFromField
   * parameter.
   */
  connectToField: string;
  /**
   * Name of the array field added to each output document. Contains the documents traversed in the $graphLookup stage
   * to reach the document.
   *
   * Documents returned in the as field are not guaranteed to be in any order.
   */
  as: string;
  /**
   * Optional. Non-negative integral number specifying the maximum recursion depth.
   */
  maxDepth?: NumericExpression;
  /**
   * Optional. Name of the field to add to each traversed document in the search path. The value of this field is the
   * recursion depth for the document, represented as a NumberLong. Recursion depth value starts at zero, so the first
   * lookup corresponds to zero depth.
   */
  depthField?: string;
  /**
   * Optional. A document specifying additional conditions for the recursive search. The syntax is identical to query
   * filter syntax.
   *
   * NOTE
   *
   * You cannot use any aggregation expression in this filter. For example, a query document such as
   *
   * { lastName: { $ne: "$lastName" } }
   *
   * will not work in this context to find documents in which the lastName value is different from the lastName value
   * of the input document, because "$lastName" will act as a string literal, not a field path.
   */
  restrictSearchWithMatch?: ObjectExpression;
};
