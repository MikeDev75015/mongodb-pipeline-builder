
import {
    $DateFromParts,
    $DateFromString,
    $DateToParts,
    $DateToString,
    $DayOfMonth,
    $DayOfWeek, $DayOfYear,
    $Hour,
    $IsoDayOfWeek,
    $IsoWeek, $IsoWeekYear,
    $Millisecond,
    $Minute,
    $Month, $Second, $ToDate, $Week, $Year
} from "./index";

const dateString = '';
const dateExpression = '';
const onError = 'test';
const onNull = 'unit';
const expression = '';
const year = 2021;
const isoWeekYear = 2020;
const timezone = '';

const yearBundle = {
    month: 2,
    day: 15
};
const isoWeekYearBundle = {
    isoWeek: 2,
    isoDayOfWeek: 15
};
const formatString = '';
const options = {
    hour: 1,
    minute: 5,
    second: 6,
    millisecond: 45
};
const iso8601 = true;


describe('date operators', () => {
    test.each([
        [
            $DateFromParts(year),
            { $dateFromParts : { 'year': year, 'month': 1, 'day': 1, 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0, 'timezone': undefined} }
        ],
        [
            $DateFromParts(undefined, isoWeekYear, timezone, yearBundle, isoWeekYearBundle, options),
            { $dateFromParts : { 'isoWeekYear': isoWeekYear, 'isoWeek': isoWeekYearBundle.isoWeek, 'isoDayOfWeek': isoWeekYearBundle.isoDayOfWeek, 'hour': options.hour, 'minute': options.minute, 'second': options.second, 'millisecond': options.millisecond, 'timezone': timezone} }
        ],
        [
            $DateFromParts(year, isoWeekYear, timezone, yearBundle, isoWeekYearBundle, options),
            { $dateFromParts : { 'year': year, 'month': yearBundle.month, 'day': yearBundle.day, 'hour': options.hour, 'minute': options.minute, 'second': options.second, 'millisecond': options.millisecond, 'timezone': timezone} }
        ],
        [$DateFromString(dateString, formatString, timezone, onError, onNull), { $dateFromString: { dateString, format: formatString, timezone, onError, onNull} }],
        [$DateFromString(dateString), { $dateFromString: { dateString, format: "%Y-%m-%dT%H:%M:%S.%LZ", timezone: undefined, onError: undefined, onNull: undefined} }],
        [$DateToParts(dateExpression, timezone, iso8601), { $dateToParts: { 'date' : dateExpression, 'timezone' : timezone, 'iso8601' : iso8601} }],
        [$DateToParts(dateExpression, timezone), { $dateToParts: { 'date' : dateExpression, 'timezone' : timezone, 'iso8601' : false} }],
        [$DateToString(dateExpression, formatString, timezone, onNull), { $dateToString: { date: dateExpression, format: formatString, timezone, onNull} }],
        [$DateToString(dateExpression), { $dateToString: { date: dateExpression, format: "%Y-%m-%dT%H:%M:%S.%LZ", timezone: undefined, onNull: undefined} }],
        [$DayOfMonth(dateExpression, timezone), { date: dateExpression, timezone }],
        [$DayOfWeek(dateExpression, timezone), { date: dateExpression, timezone }],
        [$DayOfYear(dateExpression, timezone), { date: dateExpression, timezone }],
        [$Hour(dateExpression, timezone), { date: dateExpression, timezone }],
        [$IsoDayOfWeek(dateExpression, timezone), { date: dateExpression, timezone }],
        [$IsoWeek(dateExpression, timezone), { date: dateExpression, timezone }],
        [$IsoWeekYear(dateExpression, timezone), { date: dateExpression, timezone }],
        [$Millisecond(dateExpression, timezone), { date: dateExpression, timezone }],
        [$Minute(dateExpression, timezone), { date: dateExpression, timezone }],
        [$Month(dateExpression, timezone), { date: dateExpression, timezone }],
        [$Second(dateExpression, timezone), { date: dateExpression, timezone }],
        [$ToDate(expression), { $toDate: expression }],
        [$Week(dateExpression, timezone), { date: dateExpression, timezone }],
        [$Year(dateExpression, timezone), { date: dateExpression, timezone }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});

