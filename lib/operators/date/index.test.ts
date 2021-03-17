
import {
    DateFromParts,
    DateFromString,
    DateToParts,
    DateToString,
    DayOfMonth,
    DayOfWeek, DayOfYear,
    Hour,
    IsoDayOfWeek,
    IsoWeek, IsoWeekYear,
    Millisecond,
    Minute,
    Month, Second, ToDate, Week, Year
} from "./index";

const
    dateString = '',
    dateExpression = '',
    onError = 'test',
    onNull = 'unit',
    expression = '',
    year = 2021,
    isoWeekYear = 2020,
    timezone = '';

let
    yearBundle = {
        month: 2,
        day: 15
    },
    isoWeekYearBundle = {
        isoWeek: 2,
        isoDayOfWeek: 15
    },
    formatString = '',
    options = {
        hour: 1,
        minute: 5,
        second: 6,
        millisecond: 45
    },
    iso8601 = true;


describe('date operators', () => {
    test.each([
        [DateFromParts(year, isoWeekYear, timezone, yearBundle = { month: 1, day: 1 }, isoWeekYearBundle = { isoWeek: 1, isoDayOfWeek: 1 }, options = { hour: 0, minute: 0, second: 0, millisecond: 0 }), year ? ({ $dateFromParts : { 'year': year, 'month': yearBundle.month, 'day': yearBundle.day, 'hour': options.hour, 'minute': options.minute, 'second': options.second, 'millisecond': options.millisecond, 'timezone': timezone} }) : ({ $dateFromParts : { 'isoWeekYear': isoWeekYear, 'isoWeek': isoWeekYearBundle.isoWeek, 'isoDayOfWeek': isoWeekYearBundle.isoDayOfWeek, 'hour': options.hour, 'minute': options.minute, 'second': options.second, 'millisecond': options.millisecond, 'timezone': timezone} })],
        [DateFromString(dateString, formatString = '%Y-%m-%dT%H:%M:%S.%LZ', timezone, onError, onNull), { $dateFromString: { dateString: dateString, format: formatString, timezone: timezone, onError: onError, onNull: onNull} }],
        [DateToParts(dateExpression, timezone, iso8601 = false), { $dateToParts: { 'date' : dateExpression, 'timezone' : timezone, 'iso8601' : iso8601} }],
        [DateToString(dateExpression, formatString = '%Y-%m-%dT%H:%M:%S.%LZ', timezone, onNull), { $dateToString: { date: dateExpression, format: formatString, timezone: timezone, onNull: onNull} }],
        [DayOfMonth(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [DayOfWeek(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [DayOfYear(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [Hour(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [IsoDayOfWeek(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [IsoWeek(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [IsoWeekYear(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [Millisecond(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [Minute(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [Month(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [Second(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [ToDate(expression), { $toDate: expression }],
        [Week(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
        [Year(dateExpression, timezone), { date: dateExpression, timezone: timezone }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});

