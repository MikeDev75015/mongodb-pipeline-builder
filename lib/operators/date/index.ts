// Date Expression Operators
// The following operators returns date objects or components of a date object:

/**
 * Constructs and returns a Date object given the date’s constituent properties.
 *
 * IMPORTANT
 * You cannot combine the use of calendar dates and ISO week date fields when constructing your $dateFromParts input
 * document.
 *
 * @param year Required if not using isoWeekYear. Calendar year. Can be any expression that evaluates to a number.
 * Value range: 1-9999. If the number specified is outside this range, $dateFromParts errors. Starting in MongoDB 4.4,
 * the lower bound for this value is 1. $In previous versions of MongoDB, the lower bound was 0.
 * Value range: 1-12. if the number specified is outside this range, $dateFromParts incorporates the difference in the
 * date calculation.
 * Value range: 1-31. Starting in MongoDB 4.0, if the number specified is outside this range, $dateFromParts
 * incorporates the difference in the date calculation.
 * @param isoWeekYear Required if not using year. ISO $Week Date $Year. Can be any expression that evaluates to a number.
 * Value range: 1-9999. If the number specified is outside this range, $dateFromParts errors. Starting in MongoDB 4.4,
 * the lower bound for this value is 1. $In previous versions of MongoDB, the lower bound was 0.
 * number. Value range: 1-53. If the number specified is outside this range, $dateFromParts incorporates the difference
 * in the date calculation.
 * expression that evaluates to a number. Value range: 1-7. If the number specified is outside
 * this range, $dateFromParts incorporates the difference in the date calculation.
 * outside this range, $dateFromParts incorporates the difference in the date calculation.
 * is outside this range, $dateFromParts incorporates the difference in the date calculation.
 * is outside this range, $dateFromParts incorporates the difference in the date calculation.
 * specified is outside this range, $dateFromParts incorporates the difference in the date calculation.
 * @param timezone Optional. can be any expression that evaluates to a string whose value is either:
 * - an Olson Timezone Identifier, such as "Europe/London" or "America/New_York", or a UTC offset in the form:
 * +/-[hh]:[mm], e.g. "+04:45", or +/-[hh][mm], e.g. "-0530", or +/-[hh], e.g. "+03".
 * @param yearBundle
 * @param isoWeekYearBundle
 * @param options
 * @constructor
 */
export const $DateFromParts = (
    year?: any, isoWeekYear?: any, timezone?: any,
    yearBundle = { month: 1, day: 1 },
    isoWeekYearBundle = { isoWeek: 1, isoDayOfWeek: 1 },
    options = { hour: 0, minute: 0, second: 0, millisecond: 0 }
) => year
    ? ({
        $dateFromParts : {
            'year': year, 'month': yearBundle.month, 'day': yearBundle.day,
            'hour': options.hour, 'minute': options.minute, 'second': options.second,
            'millisecond': options.millisecond, 'timezone': timezone
        }
    })
    : ({
        $dateFromParts : {
            'isoWeekYear': isoWeekYear, 'isoWeek': isoWeekYearBundle.isoWeek,
            'isoDayOfWeek': isoWeekYearBundle.isoDayOfWeek,
            'hour': options.hour, 'minute': options.minute, 'second': options.second,
            'millisecond': options.millisecond, 'timezone': timezone
        }
    });
/**
 * Converts a date/time string to a date object.
 *
 * @param dateString The date/time string to convert to a date object. See Date for more information on date/time
 * formats.
 *
 * NOTE
 * If specifying the timezone option to the operator, do not include time zone information in the dateString.
 * @param formatString Optional. The date format specification of the dateString. The format can be any expression that
 * evaluates to a string literal, containing 0 or more format specifiers. For a list of specifiers available
 * @param timezone Optional. The time zone to use to format the date.
 *
 * NOTE
 * If the dateString argument is formatted like ‘2017-02-08T12:10:40.787Z’, in which the ‘Z’ at the end indicates Zulu
 * time (UTC time zone), you cannot specify the timezone argument. <timezone> allows for the following options and
 * expressions that evaluate to them:
 * - an Olson Timezone Identifier, such as "Europe/London" or "America/New_York", or
 * - a UTC offset in the form: +/-[hh]:[mm], e.g. "+04:45", or +/-[hh][mm], e.g. "-0530", or +/-[hh], e.g. "+03", or
 * - The strings “Z”, “UTC”, or “GMT”.
 * @param onError Optional. If $dateFromString encounters an error while parsing the given dateString, it outputs the
 * result value of the provided onError expression. This result value can be of any type. If you do not specify onError,
 * $dateFromString throws an error if it cannot parse dateString.
 * @param onNull Optional. If the dateString provided to $dateFromString is null or missing, it outputs the result value
 * of the provided onNull expression. This result value can be of any type. If you do not specify onNull and dateString
 * is null or missing, then $dateFromString outputs null.
 * @constructor
 */
export const $DateFromString = (
    dateString: any, formatString = '%Y-%m-%dT%H:%M:%S.%LZ', timezone?: any, onError?: any, onNull?: any
) => ({
    $dateFromString: {
        dateString,
        format: formatString,
        timezone,
        onError,
        onNull
    }
});

/**
 * Returns a document containing the constituent parts of a date.
 * @param dateExpression
 * @param timezone
 * @param iso8601
 * @constructor
 */
export const $DateToParts = (dateExpression: any, timezone?: any, iso8601 = false) => ({
    $dateToParts: {
        'date' : dateExpression,
        'timezone' : timezone,
        'iso8601' : iso8601
    }
});
/**
 * Returns the date as a formatted string.
 * @param dateExpression
 * @param formatString
 * @param timezone
 * @param onNull
 * @constructor
 */
export const $DateToString = (
    dateExpression: any, formatString = '%Y-%m-%dT%H:%M:%S.%LZ', timezone?: any, onNull?: any
) => ({
    $dateToString: {
        date: dateExpression,
        format: formatString,
        timezone,
        onNull
    }
});
/**
 * Returns the day of the month for a date as a number between 1 and 31.
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $DayOfMonth = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday).
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $DayOfWeek = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the day of the year for a date as a number between 1 and 366 (leap year).
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $DayOfYear = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the hour for a date as a number between 0 and 23.
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $Hour = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the weekday number in ISO 8601 format, ranging from 1 (for Monday) to 7 (for Sunday).
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $IsoDayOfWeek = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the week number in ISO 8601 format, ranging from 1 to 53. $Week numbers start at 1 with the week (Monday
 * through Sunday) that contains the year’s first Thursday.
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $IsoWeek = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 (ISO 8601) and ends with the
 * Sunday of the last week (ISO 8601).
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $IsoWeekYear = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the milliseconds of a date as a number between 0 and 999.
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $Millisecond = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the minute for a date as a number between 0 and 59.
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $Minute = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the month for a date as a number between 1 (January) and 12 (December).
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $Month = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the seconds for a date as a number between 0 and 60 (leap seconds).
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $Second = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Converts value to a Date.
 * @param expression
 * @constructor
 */
export const $ToDate = (expression: any) => ({ $toDate: expression });
/**
 * Returns the week number for a date as a number between 0 (the partial week that precedes the first Sunday of the
 * year) and 53 (leap year).
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $Week = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
/**
 * Returns the year for a date as a number (e.g. 2014).
 * @param dateExpression
 * @param timezone
 * @constructor
 */
export const $Year = (dateExpression: any, timezone: any) => ({ date: dateExpression, timezone });
