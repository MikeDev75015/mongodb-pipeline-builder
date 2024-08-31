// Custom Aggregation Expression Operators
/**
 * Defines a custom accumulator operator. Accumulators are operators that maintain their state (e.g. totals, maximums,
 * minimums, and related data) as documents progress through the pipeline. Use the $accumulator operator to execute your
 * own JavaScript functions to implement behavior not supported by the MongoDB Query Language.
 *
 * The following steps outline how the $accumulator operator processes documents:
 * - The operator begins at an initial state, defined by the init function.
 * - For each document, the operator updates the state based on the accumulate function. The accumulate function’s first
 * argument is the current state, and additional arguments are be specified in the accumulateArgs array.
 * - When the operator needs to merge multiple intermediate states, it executes the merge function. For more information
 * on when the merge function is called, see Merge Two States with $merge.
 * - If a finalize function has been defined, once all documents have been processed and the state has been updated
 * accordingly, finalize converts the state to a final output.
 *
 * Merge Two States with $merge
 * As part of its internal operations, the $accumulator operator may need to merge two separate, intermediate states.
 * The merge function specifies how the operator should merge two states.
 * For example, $accumulator may need to combine two states when:
 * - $accumulator is run on a sharded cluster. The operator needs to merge the results from each shard to obtain the
 * final result.
 * - A single $accumulator operation exceeds its specified memory limit. If you specify the allowDiskUse option, the
 * operator stores the in-progress operation on disk and finishes the operation in memory. Once the operation finishes,
 * the results from disk and memory are merged together using the merge function.
 * @param init is a function used to initialize the state. The init function receives its arguments from the
 * initArgs array expression. You can specify the function definition as either BSON type Code or String.
 * @param accumulate is a function used to accumulate documents. The accumulate function receives its arguments from
 * the current state and accumulateArgs array expression. The result of the accumulate function becomes the new state.
 * You can specify the function definition as either BSON type Code or String.
 * @param accumulateArgs are Arguments passed to the accumulate function. You can use accumulateArgs to specify what
 * field value(s) to pass to the accumulate function.
 * @param merge is a Function used to merge two internal states. merge must be either a String or Code BSON type.
 * merge returns the combined result of the two merged states. For information on when the merge function is called,
 * see Merge Two States with $merge.
 * @param optional contains non required parameters, initArgs, finalize and lang. Default lang is js.
 * @constructor
 */
export const $Accumulator = <State, FinalState, Arg = any>(
  init: (...initArgs: Arg[]) => State,
  accumulate: (state: State, ...accumulateArgs: Arg[]) => State,
  accumulateArgs: Arg[],
  merge: (state1: State, state2: State) => State,
  optional: { finalize?: (state: State) => FinalState, initArgs?: Arg[], lang?: string } = {},
) => (
  {
    $accumulator: {
      init,
      ...(
        optional.initArgs ? { initArgs: optional.initArgs } : {}
      ),
      accumulate,
      accumulateArgs,
      merge,
      ...(
        optional.finalize ? { finalize: optional.finalize } : {}
      ),
      lang: optional.lang ?? 'js',
    },
  }
);

/**
 * Defines a custom aggregation function or expression in JavaScript.
 *
 * You can use the $function operator to define custom functions to implement behavior not supported by the MongoDB
 * Query Language.
 *
 * IMPORTANT
 *
 * Executing JavaScript inside an aggregation expression may decrease performance. Only use the $function operator if
 * the provided pipeline operators cannot fulfill your application’s needs.
 *
 * @param bodyCode
 * @param array
 * @param langCode
 * @constructor
 */
export const $FunctionOperator = (bodyCode: any, array: any, langCode = 'js') => (
  {
    $function: {
      body: bodyCode,
      args: array,
      lang: langCode,
    },
  }
);
