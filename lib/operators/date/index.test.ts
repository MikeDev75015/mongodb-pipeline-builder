import {
  $DateAdd,
  $DateDifference,
  $DateFromCalendarParts,
  $DateFromIsoWeekParts,
  $DateFromString,
  $DateSubtract,
  $DateToParts,
  $DateToString, $DateTrunc,
  $DayOfMonth,
  $DayOfWeek,
  $DayOfYear,
  $Hour,
  $IsoDayOfWeek,
  $IsoWeek,
  $IsoWeekYear,
  $Millisecond,
  $Minute,
  $Month,
  $Second,
  $ToDate,
  $Week,
  $Year,
} from './index';

const dateString = '';
const dateExpression = '$date';
const onError = 'test';
const onNull = 'unit';
const expression = '';
const year = 2021;
const isoWeekYear = 2020;
const timezone = '+01:00';
const startDate = new Date('2023-01-01');
const endDate = new Date('2023-02-01');
const unit = 'second';
const startOfWeek = 'mon';
const timestamp = 1697382106124;

const month = 2;
const day = 15;
const isoWeek = 2;
const isoDayOfWeek = 15;
const formatString = '';
const { hour, minute, second, millisecond } = {
  hour: 1,
  minute: 5,
  second: 6,
  millisecond: 45,
};
const iso8601 = true;
const amount = 1;

describe('date operators', () => {
  test.each([
    [$DateAdd(startDate, unit, 10), { $dateAdd: { startDate, amount: 10, unit } }],
    [$DateAdd(startDate, unit, 10, { timezone }), { $dateAdd: { startDate, amount: 10, unit, timezone } }],
    [$DateDifference(startDate, endDate, unit), { $dateDiff: { startDate, endDate, unit } }],
    [
      $DateDifference(startDate, endDate, unit, { timezone, startOfWeek }),
      { $dateDiff: { startDate, endDate, unit, timezone, startOfWeek } },
    ],
    [$DateFromCalendarParts(year), { $dateFromParts: { year } }],
    [
      $DateFromCalendarParts(year, { day, month, hour, minute, second, millisecond, timezone }),
      { $dateFromParts: { year, day, month, hour, minute, second, millisecond, timezone } },
    ],
    [$DateFromIsoWeekParts(isoWeekYear), { $dateFromParts: { isoWeekYear } }],
    [
      $DateFromIsoWeekParts(isoWeekYear, { isoWeek, isoDayOfWeek, hour, minute, second, millisecond, timezone }),
      { $dateFromParts: { isoWeekYear, isoWeek, isoDayOfWeek, hour, minute, second, millisecond, timezone } },
    ],
    [
      $DateFromString(dateString, { format: formatString, timezone, onError, onNull }),
      { $dateFromString: { dateString, format: formatString, timezone, onError, onNull } },
    ],
    [
      $DateFromString(dateString),
      { $dateFromString: { dateString } },
    ],
    [
      $DateSubtract(timestamp, unit, amount),
      { $dateSubtract: { startDate: timestamp, unit, amount } },
    ],
    [
      $DateSubtract(timestamp, unit, amount, { timezone }),
      { $dateSubtract: { startDate: timestamp, unit, amount, timezone } },
    ],
    [
      $DateToParts(dateExpression, { timezone, iso8601 }),
      { $dateToParts: { 'date': dateExpression, 'timezone': timezone, 'iso8601': iso8601 } },
    ],
    [
      $DateToParts(dateExpression),
      { $dateToParts: { 'date': dateExpression } },
    ],
    [
      $DateToString(dateExpression, { format: formatString, timezone, onNull }),
      { $dateToString: { date: dateExpression, format: formatString, timezone, onNull } },
    ],
    [$DateToString(dateExpression), { $dateToString: { date: dateExpression } }],
    [$DateTrunc(dateExpression, unit), { $dateTrunc: { date: dateExpression, unit } }],
    [$DayOfMonth(dateExpression, { timezone }), { $dayOfMonth: { date: dateExpression, timezone } }],
    [$DayOfMonth(dateExpression), { $dayOfMonth: { date: dateExpression } }],
    [$DayOfWeek(dateExpression, { timezone }), { $dayOfWeek: { date: dateExpression, timezone } }],
    [$DayOfWeek(dateExpression), { $dayOfWeek: { date: dateExpression } }],
    [$DayOfYear(dateExpression, { timezone }), { $dayOfYear: { date: dateExpression, timezone } }],
    [$DayOfYear(dateExpression), { $dayOfYear: { date: dateExpression } }],
    [$Hour(dateExpression, { timezone }), { $hour: { date: dateExpression, timezone } }],
    [$Hour(dateExpression), { $hour: { date: dateExpression } }],
    [$IsoDayOfWeek(dateExpression, { timezone }), { $isoDayOfWeek: { date: dateExpression, timezone } }],
    [$IsoDayOfWeek(dateExpression), { $isoDayOfWeek: { date: dateExpression } }],
    [$IsoWeek(dateExpression, { timezone }), { $isoWeek: { date: dateExpression, timezone } }],
    [$IsoWeek(dateExpression), { $isoWeek: { date: dateExpression } }],
    [$IsoWeekYear(dateExpression, { timezone }), { $isoWeekYear: { date: dateExpression, timezone } }],
    [$IsoWeekYear(dateExpression), { $isoWeekYear: { date: dateExpression } }],
    [$Millisecond(dateExpression, { timezone }), { $millisecond: { date: dateExpression, timezone } }],
    [$Millisecond(dateExpression), { $millisecond: { date: dateExpression } }],
    [$Minute(dateExpression, { timezone }), { $minute: { date: dateExpression, timezone } }],
    [$Minute(dateExpression), { $minute: { date: dateExpression } }],
    [$Month(dateExpression, { timezone }), { $month: { date: dateExpression, timezone } }],
    [$Month(dateExpression), { $month: { date: dateExpression } }],
    [$Second(dateExpression, { timezone }), { $second: { date: dateExpression, timezone } }],
    [$Second(dateExpression), { $second: { date: dateExpression } }],
    [$ToDate(expression), { $toDate: expression }],
    [$Week(dateExpression, { timezone }), { $week: { date: dateExpression, timezone } }],
    [$Week(dateExpression), { $week: { date: dateExpression } }],
    [$Year(dateExpression, { timezone }), { $year: { date: dateExpression, timezone } }],
    [$Year(dateExpression), { $year: { date: dateExpression } }],
  ])('should %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});

