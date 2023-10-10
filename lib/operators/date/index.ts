// Date Expression Operators
// The following operators returns date objects or components of a date object:

import { Expression } from '../../models';
import { AbbreviatedDay, DateUnit, Day } from '../../models/core/date-unit';
import {
  BooleanExpression,
  DateExpression,
  NumericExpression,
  StringExpression,
  TimeZoneExpression,
} from '../../models/core/expression';

/**
 * Increments a Date() object by a specified number of time units.
 * @param startDate The beginning date, in UTC, for the addition operation. The startDate can be any expression that
 *   resolves to a Date, a Timestamp, or an ObjectID.
 * @param unit The unit used to measure the amount of time added to the startDate.
 * @param amount The number of units added to the startDate. The amount is an expression that resolves to an integer or
 *   long. The amount can also resolve to an integral decimal or a double if that value can be converted to a long
 *   without loss of precision.
 * @param optional Optional.
 */
export const $DateAdd = (
  startDate: Expression | Date,
  unit: Expression | DateUnit,
  amount: NumericExpression,
  optional: {
    /**
     * The timezone to carry out the operation. <tzExpression> must be a valid expression that resolves to
     *   a string formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the
     *   result is displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $dateAdd: {
      startDate,
      unit,
      amount,
      ...optional,
    },
  }
);

/**
 * Returns the difference between two dates.
 * @param startDate The start of the time period. The startDate can be any expression that resolves to a Date, a
 *   Timestamp, or an ObjectID.
 * @param endDate The end of the time period. The endDate can be any expression that resolves to a Date, a Timestamp,
 *   or an ObjectID.
 * @param unit The time measurement unit between the startDate and endDate.
 * @param optional Optional.
 */
export const $DateDifference = (
  startDate: Expression | Date,
  endDate: Expression | Date,
  unit: Expression | DateUnit,
  optional: {
    /**
     * The timezone to carry out the operation. <tzExpression> must be a valid expression that resolves to
     *   a string formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the
     *   result is displayed in UTC.
     */
    timezone?: TimeZoneExpression;
    /**
     * The start of the week. Used when unit is week. Defaults to Sunday.
     *
     * startOfWeek is an expression that must resolve to one of these case insensitive strings:
     * monday (or mon), tuesday (or tue), wednesday (or wed), thursday (or thu), friday (or fri), saturday (or sat) or
     * sunday (or sun)
     */
    startOfWeek?: Expression | Day | AbbreviatedDay;
  } = {},
) => (
  {
    $dateDiff: {
      startDate,
      endDate,
      unit,
      ...optional,
    },
  }
);

/**
 * Constructs and returns a Date object given the calendar date’s constituent properties.
 *
 * @param year Calendar year. Can be any expression that evaluates to a number. Value range: 1-9999. If the number
 *   specified is outside this range, $dateFromParts errors. Starting in MongoDB 4.4, the lower bound for this value is
 *   1. In previous versions of MongoDB, the lower bound was 0.
 * @param optional Optionals.
 */
export const $DateFromCalendarParts = (
  year: NumericExpression,
  optional: {
    /**
     * Month. Can be any expression that evaluates to a number.
     *
     * Defaults to 1.
     *
     * Value range: 1-12
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    month?: NumericExpression;
    /**
     * Day of month. Can be any expression that evaluates to a number.
     *
     * Defaults to 1.
     *
     * Value range: 1-31
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    day?: NumericExpression;
    /**
     * Hour. Can be any expression that evaluates to a number.
     *
     * Defaults to 0.
     *
     * Value range: 0-23
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    hour?: NumericExpression;
    /**
     * Minute. Can be any expression that evaluates to a number.
     *
     * Defaults to 0.
     *
     * Value range: 0-59 If the number specified is outside this range, $dateFromParts incorporates the difference in
     * the date calculation.
     */
    minute?: NumericExpression;
    /**
     * Second. Can be any expression that evaluates to a number.
     *
     * Defaults to 0.
     *
     * Value range: 0-59
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    second?: NumericExpression;
    /**
     * Millisecond. Can be any expression that evaluates to a number.
     *
     * Defaults to 0.
     *
     * Value range: 0-999
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    millisecond?: NumericExpression;
    /**
     * Can be any expression that evaluates to a string whose value is either an Olson Timezone Identifier or a UTC
     * offset
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  { $dateFromParts: { year, ...optional } }
);

/**
 * Constructs and returns a Date object given the ISO week date’s constituent properties.
 *
 * @param isoWeekYear ISO Week Date Year. Can be any expression that evaluates to a number. Value range: 1-9999. If the
 *   number specified is outside this range, $dateFromParts errors. Starting in MongoDB 4.4, the lower bound for this
 *   value is 1. In previous versions of MongoDB, the lower bound was 0.
 * @param optional Optionals.
 */
export const $DateFromIsoWeekParts = (
  isoWeekYear: NumericExpression,
  optional: {
    /**
     * Week of year. Can be any expression that evaluates to a number.
     *
     * Defaults to 1.
     *
     * Value range: 1-53
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    isoWeek?: NumericExpression;
    /**
     * Day of week (Monday 1 - Sunday 7). Can be any expression that evaluates to a number.
     *
     * Defaults to 1.
     *
     * Value range: 1-7
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    isoDayOfWeek?: NumericExpression;
    /**
     * Hour. Can be any expression that evaluates to a number.
     *
     * Defaults to 0.
     *
     * Value range: 0-23
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    hour?: NumericExpression;
    /**
     * Minute. Can be any expression that evaluates to a number.
     *
     * Defaults to 0.
     *
     * Value range: 0-59 If the number specified is outside this range, $dateFromParts incorporates the difference in
     * the date calculation.
     */
    minute?: NumericExpression;
    /**
     * Second. Can be any expression that evaluates to a number.
     *
     * Defaults to 0.
     *
     * Value range: 0-59
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    second?: NumericExpression;
    /**
     * Millisecond. Can be any expression that evaluates to a number.
     *
     * Defaults to 0.
     *
     * Value range: 0-999
     *
     * If the number specified is outside this range, $dateFromParts incorporates the difference in the date
     * calculation.
     */
    millisecond?: NumericExpression;
    /**
     * Can be any expression that evaluates to a string whose value is either an Olson Timezone Identifier or a UTC
     * offset
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  { $dateFromParts: { isoWeekYear, ...optional } }
);

/**
 * Converts a date/time string to a date object.
 *
 * @param dateString The date/time string to convert to a date object. See Date for more information on date/time
 * formats.
 *
 * NOTE
 * If specifying the timezone option to the operator, do not include time zone information in the dateString.
 * @param optional Optional.
 * @constructor
 */
export const $DateFromString = (
  dateString: StringExpression,
  optional: {
    /**
     * The date format specification of the dateString. The format can be any expression that evaluates to a string
     * literal, containing 0 or more format specifiers. For a list of specifiers available, see Format Specifiers.
     *
     * If unspecified, $dateFromString uses "%Y-%m-%dT%H:%M:%S.%LZ" as the default format but accepts a variety of
     * formats and attempts to parse the dateString if possible.
     */
    format?: StringExpression;
    /**
     * The time zone to use to format the date.
     *
     * Note
     * If the dateString argument is formatted like '2017-02-08T12:10:40.787Z', in which the 'Z' at the end indicates
     * Zulu time (UTC time zone), you cannot specify the timezone argument.
     *
     * <timezone> allows for the following options and expressions that evaluate to them:
     *
     * an Olson Timezone Identifier, such as "Europe/London" or "America/New_York", or
     *
     * a UTC offset in the form:
     *
     * +/-[hh]:[mm], e.g. "+04:45", or
     *
     * +/-[hh][mm], e.g. "-0530", or
     *
     * +/-[hh], e.g. "+03", or
     *
     * The strings "Z", "UTC", or "GMT"
     *
     * For more information on expressions, see Expression Operators.
     */
    timezone?: TimeZoneExpression;
    /**
     * If $dateFromString encounters an error while parsing the given dateString, it outputs the result value of the
     * provided onError expression. This result value can be of any type.
     *
     * If you do not specify onError, $dateFromString throws an error if it cannot parse dateString.
     */
    onError?: Expression;
    /**
     * If the dateString provided to $dateFromString is null or missing, it outputs the result value of the provided
     * onNull expression. This result value can be of any type.
     *
     * If you do not specify onNull and dateString is null or missing, then $dateFromString outputs null.
     */
    onNull?: Expression;
  } = {},
) => (
  { $dateFromString: { dateString, ...optional } }
);

/**
 * Decrements a Date() object by a specified number of time units.
 *
 * @param startDate The beginning date, in UTC, for the subtraction operation. The startDate can be any expression that
 *   resolves to a Date, a Timestamp, or an ObjectID.
 * @param unit The unit used to measure the amount of time subtracted from the startDate. The unit is an expression
 *   that resolves to one of the following strings: year, quarter, week, month, day, hour, minute, second and
 *   millisecond.
 * @param amount The number of units subtracted from the startDate. The amount is an expression that resolves to an
 *   integer or long. The amount can also resolve to an integral decimal and or a double if that value can be converted
 *   to a long without loss of precision.
 * @param optional
 */
export const $DateSubtract = (
  startDate: DateExpression,
  unit: Expression | DateUnit,
  amount: NumericExpression,
  optional: {
    /**
     * The timezone to carry out the operation. <tzExpression> must be a valid expression that resolves to
     *   a string formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the
     *   result is displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $dateSubtract: {
      startDate,
      unit,
      amount,
      ...optional,
    },
  }
);

/**
 * Returns a document containing the constituent parts of a date.
 *
 * @param date The input date for which to return parts. <dateExpression> can be any expression that resolves to a
 *   Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 */
export const $DateToParts = (
  date: DateExpression,
  optional: {
    /**
     * The timezone to use to format the date. By default, $dateToParts uses UTC.
     *
     * <timezone> can be any expression that evaluates to a string whose value is either an Olson Timezone Identifier
     * or a UTC offset
     */
    timezone?: any;
    /**
     * If set to true, modifies the output document to use ISO week date fields. Defaults to false.
     */
    iso8601?: BooleanExpression;
  } = {},
) => (
  { $dateToParts: { date, ...optional } }
);

/**
 * Returns the date as a formatted string.
 *
 * @param date The date to convert to string. <dateExpression> must be a valid expression that resolves to a Date, a
 *   Timestamp, or an ObjectID.
 * @param optional Optional.
 */
export const $DateToString = (
  date: DateExpression,
  optional: {
    /**
     * The date format specification. <formatString> can be any string literal, containing 0 or more format specifiers.
     */
    format?: StringExpression;
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
    /**
     * The value to return if the date is null or missing. The arguments can be any valid expression. If unspecified,
     * $dateToString returns null if the date is null or missing.
     */
    onNull?: any;
  } = {},
) => (
  { $dateToString: { date, ...optional } }
);

/**
 * Truncates a date.
 *
 * @param date The date to truncate, specified in UTC. The date can be any expression that resolves to a Date, a
 *   Timestamp, or an ObjectID.
 * @param unit The unit of time, specified as an expression that must resolve to one of these strings:
 * year, quarter, week, month, day, hour, minute or second. Together, binSize and unit specify the time period used in
 *   the $dateTrunc calculation.
 * @param optional Optional.
 */
export const $DateTrunc = (
  date: DateExpression,
  unit: Expression | DateUnit,
  optional: {
    /**
     * The numeric time value, specified as an expression that must resolve to a positive non-zero number. Defaults to
     * 1.
     */
    binSize?: NumericExpression;
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
    /**
     * The start of the week. Used when unit is week. Defaults to Sunday.
     *
     * startOfWeek is an expression that must resolve to one of these case insensitive strings:
     * monday (or mon), tuesday (or tue), wednesday (or wed), thursday (or thu), friday (or fri), saturday (or sat) or
     * sunday (or sun)
     */
    startOfWeek?: Expression | Day | AbbreviatedDay;
  } = {},
) => (
  {
    $dateTrunc: { date, unit, ...optional },
  }
);

/**
 * Returns the day of the month for a date as a number between 1 and 31.
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $DayOfMonth = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $dayOfMonth: { date, ...optional },
  }
);

/**
 * Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday).
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $DayOfWeek = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $dayOfWeek: { date, ...optional },
  }
);

/**
 * Returns the day of the year for a date as a number between 1 and 366 (leap year).
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $DayOfYear = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $dayOfYear: { date, ...optional },
  }
);

/**
 * Returns the hour for a date as a number between 0 and 23.
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $Hour = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $hour: { date, ...optional },
  }
);

/**
 * Returns the weekday number in ISO 8601 format, ranging from 1 (for Monday) to 7 (for Sunday).
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $IsoDayOfWeek = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $isoDayOfWeek: { date, ...optional },
  }
);

/**
 * Returns the week number in ISO 8601 format, ranging from 1 to 53. $Week numbers start at 1 with the week (Monday
 * through Sunday) that contains the year’s first Thursday.
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $IsoWeek = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $isoWeek: { date, ...optional },
  }
);

/**
 * Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 (ISO 8601) and ends with the
 * Sunday of the last week (ISO 8601).
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $IsoWeekYear = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $isoWeekYear: { date, ...optional },
  }
);

/**
 * Returns the milliseconds of a date as a number between 0 and 999.
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $Millisecond = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $millisecond: { date, ...optional },
  }
);

/**
 * Returns the minute for a date as a number between 0 and 59.
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $Minute = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $minute: { date, ...optional },
  }
);

/**
 * Returns the month for a date as a number between 1 (January) and 12 (December).
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $Month = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $month: { date, ...optional },
  }
);

/**
 * Returns the seconds for a date as a number between 0 and 60 (leap seconds).
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $Second = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $second: { date, ...optional },
  }
);

/**
 * Converts value to a Date.
 *
 * @param expression Any valid expression.
 * @constructor
 */
export const $ToDate = (expression: Expression) => ({ $toDate: expression });

/**
 * Returns the week number for a date as a number between 0 (the partial week that precedes the first Sunday of the
 * year) and 53 (leap year).
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $Week = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $week: { date, ...optional },
  }
);

/**
 * Returns the year for a date as a number (e.g. 2014).
 *
 * @param date The date to which the operator is applied. <dateExpression> must be a valid expression that resolves to
 *   a Date, a Timestamp, or an ObjectID.
 * @param optional Optional.
 * @constructor
 */
export const $Year = (
  date: DateExpression,
  optional: {
    /**
     * The timezone of the operation result. <tzExpression> must be a valid expression that resolves to a string
     * formatted as either an Olson Timezone Identifier or a UTC Offset. If no timezone is provided, the result is
     * displayed in UTC.
     */
    timezone?: TimeZoneExpression;
  } = {},
) => (
  {
    $year: { date, ...optional },
  }
);
