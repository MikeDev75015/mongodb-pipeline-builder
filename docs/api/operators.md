# MongoDB Aggregation Operators Reference

Complete reference for all MongoDB aggregation operators supported by Pipeline Builder.

## Table of Contents

- [Comparison Operators](#comparison-operators)
- [Logical Operators](#logical-operators)
- [Arithmetic Operators](#arithmetic-operators)
- [Array Operators](#array-operators)
- [String Operators](#string-operators)
- [Date Operators](#date-operators)
- [Conditional Operators](#conditional-operators)
- [Type Operators](#type-operators)
- [Accumulator Operators](#accumulator-operators)
- [Set Operators](#set-operators)
- [Trigonometry Operators](#trigonometry-operators)
- [Bitwise Operators](#bitwise-operators)
- [Custom Operators](#custom-operators)

---

## Comparison Operators

### $Equal

Compare two values for equality.

```typescript
import { $Equal } from 'mongodb-pipeline-builder/operators';

$Equal('$status', 'active')
```

**Output:**
```typescript
{ $eq: ['$status', 'active'] }
```

**Common Usage:**
```typescript
builder.Match($Expression($Equal('$age', 18)))
```

---

### $NotEqual

Compare two values for inequality.

```typescript
import { $NotEqual } from 'mongodb-pipeline-builder/operators';

$NotEqual('$status', 'deleted')
```

**Output:**
```typescript
{ $ne: ['$status', 'deleted'] }
```

---

### $GreaterThan

Check if first value is greater than second.

```typescript
import { $GreaterThan } from 'mongodb-pipeline-builder/operators';

$GreaterThan('$age', 18)
```

**Output:**
```typescript
{ $gt: ['$age', 18] }
```

**Example:**
```typescript
builder.Match($Expression($GreaterThan('$price', 100)))
```

---

### $GreaterThanEqual

Check if first value is greater than or equal to second.

```typescript
import { $GreaterThanEqual } from 'mongodb-pipeline-builder/operators';

$GreaterThanEqual('$age', 18)
```

**Output:**
```typescript
{ $gte: ['$age', 18] }
```

---

### $LessThan

Check if first value is less than second.

```typescript
import { $LessThan } from 'mongodb-pipeline-builder/operators';

$LessThan('$stock', 10)
```

**Output:**
```typescript
{ $lt: ['$stock', 10] }
```

---

### $LessThanEqual

Check if first value is less than or equal to second.

```typescript
import { $LessThanEqual } from 'mongodb-pipeline-builder/operators';

$LessThanEqual('$age', 65)
```

**Output:**
```typescript
{ $lte: ['$age', 65] }
```

---

### $Compare

Compare two values and return -1, 0, or 1.

```typescript
import { $Compare } from 'mongodb-pipeline-builder/operators';

$Compare('$age', 25)
```

**Output:**
```typescript
{ $cmp: ['$age', 25] }
```

**Returns:**
- `-1` if first value < second value
- `0` if values are equal
- `1` if first value > second value

---

## Logical Operators

### $And

Logical AND of multiple expressions.

```typescript
import { $And } from 'mongodb-pipeline-builder/operators';

$And(
  $Equal('$status', 'active'),
  $GreaterThan('$age', 18),
  $LessThan('$age', 65)
)
```

**Output:**
```typescript
{
  $and: [
    { $eq: ['$status', 'active'] },
    { $gt: ['$age', 18] },
    { $lt: ['$age', 65] }
  ]
}
```

---

### $Or

Logical OR of multiple expressions.

```typescript
import { $Or } from 'mongodb-pipeline-builder/operators';

$Or(
  $Equal('$status', 'active'),
  $Equal('$status', 'pending')
)
```

**Output:**
```typescript
{
  $or: [
    { $eq: ['$status', 'active'] },
    { $eq: ['$status', 'pending'] }
  ]
}
```

---

### $Not

Logical NOT (negation) of an expression.

```typescript
import { $Not } from 'mongodb-pipeline-builder/operators';

$Not($Equal('$status', 'deleted'))
```

**Output:**
```typescript
{ $not: [{ $eq: ['$status', 'deleted'] }] }
```

---

## Arithmetic Operators

### $Add

Add numbers together.

```typescript
import { $Add } from 'mongodb-pipeline-builder/operators';

$Add('$price', '$tax', 10)
```

**Output:**
```typescript
{ $add: ['$price', '$tax', 10] }
```

**Example:**
```typescript
builder.AddFields(
  Field('totalPrice', $Add('$price', '$tax', '$shipping'))
)
```

---

### $Subtract

Subtract one number from another.

```typescript
import { $Subtract } from 'mongodb-pipeline-builder/operators';

$Subtract('$total', '$discount')
```

**Output:**
```typescript
{ $subtract: ['$total', '$discount'] }
```

---

### $Multiply

Multiply numbers together.

```typescript
import { $Multiply } from 'mongodb-pipeline-builder/operators';

$Multiply('$price', '$quantity')
```

**Output:**
```typescript
{ $multiply: ['$price', '$quantity'] }
```

**Example:**
```typescript
builder.AddFields(
  Field('subtotal', $Multiply('$price', '$quantity'))
)
```

---

### $Divide

Divide one number by another.

```typescript
import { $Divide } from 'mongodb-pipeline-builder/operators';

$Divide('$total', '$count')
```

**Output:**
```typescript
{ $divide: ['$total', '$count'] }
```

---

### $Mod

Modulo operation (remainder of division).

```typescript
import { $Mod } from 'mongodb-pipeline-builder/operators';

$Mod('$quantity', 10)
```

**Output:**
```typescript
{ $mod: ['$quantity', 10] }
```

---

### $Pow

Raise a number to a power.

```typescript
import { $Pow } from 'mongodb-pipeline-builder/operators';

$Pow('$value', 2) // Square
```

**Output:**
```typescript
{ $pow: ['$value', 2] }
```

---

### $Sqrt

Calculate square root.

```typescript
import { $Sqrt } from 'mongodb-pipeline-builder/operators';

$Sqrt('$area')
```

**Output:**
```typescript
{ $sqrt: '$area' }
```

---

### $Absolute

Get absolute value.

```typescript
import { $Absolute } from 'mongodb-pipeline-builder/operators';

$Absolute('$temperature')
```

**Output:**
```typescript
{ $abs: '$temperature' }
```

---

### $Ceil

Round up to nearest integer.

```typescript
import { $Ceil } from 'mongodb-pipeline-builder/operators';

$Ceil('$price')
```

**Output:**
```typescript
{ $ceil: '$price' }
```

---

### $Floor

Round down to nearest integer.

```typescript
import { $Floor } from 'mongodb-pipeline-builder/operators';

$Floor('$price')
```

**Output:**
```typescript
{ $floor: '$price' }
```

---

### $Round

Round to nearest integer or decimal place.

```typescript
import { $Round } from 'mongodb-pipeline-builder/operators';

$Round('$price', 2) // Round to 2 decimal places
```

**Output:**
```typescript
{ $round: ['$price', 2] }
```

---

### $Trunc

Truncate to integer.

```typescript
import { $Trunc } from 'mongodb-pipeline-builder/operators';

$Trunc('$price')
```

**Output:**
```typescript
{ $trunc: '$price' }
```

---

### $Exponent

Calculate e^x.

```typescript
import { $Exponent } from 'mongodb-pipeline-builder/operators';

$Exponent('$value')
```

**Output:**
```typescript
{ $exp: '$value' }
```

---

### $NaturalLog

Calculate natural logarithm (ln).

```typescript
import { $NaturalLog } from 'mongodb-pipeline-builder/operators';

$NaturalLog('$value')
```

**Output:**
```typescript
{ $ln: '$value' }
```

---

### $Log

Calculate logarithm with custom base.

```typescript
import { $Log } from 'mongodb-pipeline-builder/operators';

$Log('$value', 10) // Log base 10
```

**Output:**
```typescript
{ $log: ['$value', 10] }
```

---

### $Log10

Calculate base-10 logarithm.

```typescript
import { $Log10 } from 'mongodb-pipeline-builder/operators';

$Log10('$value')
```

**Output:**
```typescript
{ $log10: '$value' }
```

---

## Array Operators

### $Size

Get array length.

```typescript
import { $Size } from 'mongodb-pipeline-builder/operators';

$Size('$items')
```

**Output:**
```typescript
{ $size: '$items' }
```

**Example:**
```typescript
builder.AddFields(
  Field('itemCount', $Size('$items'))
)
```

---

### $ArrayElementAt

Get element at specific index.

```typescript
import { $ArrayElementAt } from 'mongodb-pipeline-builder/operators';

$ArrayElementAt('$items', 0)  // First element
$ArrayElementAt('$items', -1) // Last element
```

**Output:**
```typescript
{ $arrayElemAt: ['$items', 0] }
```

**Example:**
```typescript
builder.AddFields(
  Field('firstItem', $ArrayElementAt('$items', 0)),
  Field('lastItem', $ArrayElementAt('$items', -1))
)
```

---

### $Filter

Filter array elements.

```typescript
import { $Filter } from 'mongodb-pipeline-builder/operators';

$Filter('$items', 'item', $GreaterThan('$$item.price', 100))
```

**Output:**
```typescript
{
  $filter: {
    input: '$items',
    as: 'item',
    cond: { $gt: ['$$item.price', 100] }
  }
}
```

---

### $Map

Transform array elements.

```typescript
import { $Map } from 'mongodb-pipeline-builder/operators';

$Map('$items', 'item', $Multiply('$$item.price', 1.1))
```

**Output:**
```typescript
{
  $map: {
    input: '$items',
    as: 'item',
    in: { $multiply: ['$$item.price', 1.1] }
  }
}
```

**Example - Add 10% to all prices:**
```typescript
builder.AddFields(
  Field('adjustedPrices', $Map('$prices', 'price', $Multiply('$$price', 1.1)))
)
```

---

### $Reduce

Reduce array to single value.

```typescript
import { $Reduce } from 'mongodb-pipeline-builder/operators';

$Reduce('$items', 0, $Add('$$value', '$$this.quantity'))
```

**Output:**
```typescript
{
  $reduce: {
    input: '$items',
    initialValue: 0,
    in: { $add: ['$$value', '$$this.quantity'] }
  }
}
```

---

### $Slice

Get subset of array.

```typescript
import { $Slice } from 'mongodb-pipeline-builder/operators';

$Slice('$items', 5)      // First 5 elements
$Slice('$items', -5)     // Last 5 elements
$Slice('$items', 2, 5)   // 5 elements starting at index 2
```

**Output:**
```typescript
{ $slice: ['$items', 5] }
```

---

### $ConcatArrays

Concatenate arrays.

```typescript
import { $ConcatArrays } from 'mongodb-pipeline-builder/operators';

$ConcatArrays('$array1', '$array2', [1, 2, 3])
```

**Output:**
```typescript
{ $concatArrays: ['$array1', '$array2', [1, 2, 3]] }
```

---

### $In

Check if value is in array.

```typescript
import { $In } from 'mongodb-pipeline-builder/operators';

$In('$status', ['active', 'pending', 'verified'])
```

**Output:**
```typescript
{ $in: ['$status', ['active', 'pending', 'verified']] }
```

---

### $IndexOfArray

Find index of element in array.

```typescript
import { $IndexOfArray } from 'mongodb-pipeline-builder/operators';

$IndexOfArray('$items', 'targetValue')
```

**Output:**
```typescript
{ $indexOfArray: ['$items', 'targetValue'] }
```

---

### $IsArray

Check if value is an array.

```typescript
import { $IsArray } from 'mongodb-pipeline-builder/operators';

$IsArray('$items')
```

**Output:**
```typescript
{ $isArray: '$items' }
```

---

### $ReverseArray

Reverse array order.

```typescript
import { $ReverseArray } from 'mongodb-pipeline-builder/operators';

$ReverseArray('$items')
```

**Output:**
```typescript
{ $reverseArray: '$items' }
```

---

### $ArrayToObject

Convert array to object.

```typescript
import { $ArrayToObject } from 'mongodb-pipeline-builder/operators';

$ArrayToObject([
  { k: 'name', v: 'John' },
  { k: 'age', v: 30 }
])
```

**Output:**
```typescript
{
  $arrayToObject: [
    { k: 'name', v: 'John' },
    { k: 'age', v: 30 }
  ]
}
```

---

### $ObjectToArray

Convert object to array of key-value pairs.

```typescript
import { $ObjectToArray } from 'mongodb-pipeline-builder/operators';

$ObjectToArray('$document')
```

**Output:**
```typescript
{ $objectToArray: '$document' }
```

---

### $Zip

Combine multiple arrays.

```typescript
import { $Zip } from 'mongodb-pipeline-builder/operators';

$Zip(['$names', '$ages'])
```

**Output:**
```typescript
{ $zip: { inputs: ['$names', '$ages'] } }
```

---

## String Operators

### $Concat

Concatenate strings.

```typescript
import { $Concat } from 'mongodb-pipeline-builder/operators';

$Concat('$firstName', ' ', '$lastName')
```

**Output:**
```typescript
{ $concat: ['$firstName', ' ', '$lastName'] }
```

**Example:**
```typescript
builder.AddFields(
  Field('fullName', $Concat('$firstName', ' ', '$lastName'))
)
```

---

### $ToLower

Convert to lowercase.

```typescript
import { $ToLower } from 'mongodb-pipeline-builder/operators';

$ToLower('$email')
```

**Output:**
```typescript
{ $toLower: '$email' }
```

---

### $ToUpper

Convert to uppercase.

```typescript
import { $ToUpper } from 'mongodb-pipeline-builder/operators';

$ToUpper('$name')
```

**Output:**
```typescript
{ $toUpper: '$name' }
```

---

### $Split

Split string into array.

```typescript
import { $Split } from 'mongodb-pipeline-builder/operators';

$Split('$fullName', ' ')
```

**Output:**
```typescript
{ $split: ['$fullName', ' '] }
```

---

### $Substr

Extract substring.

```typescript
import { $Substr } from 'mongodb-pipeline-builder/operators';

$Substr('$text', 0, 10) // First 10 characters
```

**Output:**
```typescript
{ $substr: ['$text', 0, 10] }
```

---

### $SubstrBytes

Extract substring by byte position.

```typescript
import { $SubstrBytes } from 'mongodb-pipeline-builder/operators';

$SubstrBytes('$text', 0, 10)
```

**Output:**
```typescript
{ $substrBytes: ['$text', 0, 10] }
```

---

### $SubstrCP

Extract substring by code point.

```typescript
import { $SubstrCP } from 'mongodb-pipeline-builder/operators';

$SubstrCP('$text', 0, 10)
```

**Output:**
```typescript
{ $substrCP: ['$text', 0, 10] }
```

---

### $StrLenBytes

Get string length in bytes.

```typescript
import { $StrLenBytes } from 'mongodb-pipeline-builder/operators';

$StrLenBytes('$text')
```

**Output:**
```typescript
{ $strLenBytes: '$text' }
```

---

### $StrLenCP

Get string length in code points.

```typescript
import { $StrLenCP } from 'mongodb-pipeline-builder/operators';

$StrLenCP('$text')
```

**Output:**
```typescript
{ $strLenCP: '$text' }
```

---

### $Trim

Remove whitespace from both ends.

```typescript
import { $Trim } from 'mongodb-pipeline-builder/operators';

$Trim('$text')
```

**Output:**
```typescript
{ $trim: { input: '$text' } }
```

---

### $Ltrim

Remove whitespace from left.

```typescript
import { $Ltrim } from 'mongodb-pipeline-builder/operators';

$Ltrim('$text')
```

**Output:**
```typescript
{ $ltrim: { input: '$text' } }
```

---

### $Rtrim

Remove whitespace from right.

```typescript
import { $Rtrim } from 'mongodb-pipeline-builder/operators';

$Rtrim('$text')
```

**Output:**
```typescript
{ $rtrim: { input: '$text' } }
```

---

### $IndexOfBytes

Find byte position of substring.

```typescript
import { $IndexOfBytes } from 'mongodb-pipeline-builder/operators';

$IndexOfBytes('$text', 'search')
```

**Output:**
```typescript
{ $indexOfBytes: ['$text', 'search'] }
```

---

### $IndexOfCodePoint

Find code point position of substring.

```typescript
import { $IndexOfCodePoint } from 'mongodb-pipeline-builder/operators';

$IndexOfCodePoint('$text', 'search')
```

**Output:**
```typescript
{ $indexOfCP: ['$text', 'search'] }
```

---

### $RegexFind

Find first regex match.

```typescript
import { $RegexFind } from 'mongodb-pipeline-builder/operators';

$RegexFind('$email', /\@(.+)$/)
```

**Output:**
```typescript
{ $regexFind: { input: '$email', regex: /\@(.+)$/ } }
```

---

### $RegexFindAll

Find all regex matches.

```typescript
import { $RegexFindAll } from 'mongodb-pipeline-builder/operators';

$RegexFindAll('$text', /\d+/g)
```

**Output:**
```typescript
{ $regexFindAll: { input: '$text', regex: /\d+/g } }
```

---

### $RegexMatch

Check if string matches regex.

```typescript
import { $RegexMatch } from 'mongodb-pipeline-builder/operators';

$RegexMatch('$email', /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
```

**Output:**
```typescript
{ $regexMatch: { input: '$email', regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ } }
```

---

### $ReplaceOne

Replace first occurrence.

```typescript
import { $ReplaceOne } from 'mongodb-pipeline-builder/operators';

$ReplaceOne('$text', 'old', 'new')
```

**Output:**
```typescript
{ $replaceOne: { input: '$text', find: 'old', replacement: 'new' } }
```

---

### $ReplaceAll

Replace all occurrences.

```typescript
import { $ReplaceAll } from 'mongodb-pipeline-builder/operators';

$ReplaceAll('$text', 'old', 'new')
```

**Output:**
```typescript
{ $replaceAll: { input: '$text', find: 'old', replacement: 'new' } }
```

---

### $StrCaseCmp

Case-sensitive string comparison.

```typescript
import { $StrCaseCmp } from 'mongodb-pipeline-builder/operators';

$StrCaseCmp('$status', 'ACTIVE')
```

**Output:**
```typescript
{ $strcasecmp: ['$status', 'ACTIVE'] }
```

---

## Date Operators

### $DateAdd

Add time to date.

```typescript
import { $DateAdd } from 'mongodb-pipeline-builder/operators';

$DateAdd('$createdAt', 'day', 7)
```

**Output:**
```typescript
{ $dateAdd: { startDate: '$createdAt', unit: 'day', amount: 7 } }
```

**Units:** `year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`

---

### $DateSubtract

Subtract time from date.

```typescript
import { $DateSubtract } from 'mongodb-pipeline-builder/operators';

$DateSubtract('$expiresAt', 'month', 1)
```

**Output:**
```typescript
{ $dateSubtract: { startDate: '$expiresAt', unit: 'month', amount: 1 } }
```

---

### $DateDifference

Calculate difference between dates.

```typescript
import { $DateDifference } from 'mongodb-pipeline-builder/operators';

$DateDifference('$startDate', '$endDate', 'day')
```

**Output:**
```typescript
{ $dateDiff: { startDate: '$startDate', endDate: '$endDate', unit: 'day' } }
```

---

### $DateToString

Format date as string.

```typescript
import { $DateToString } from 'mongodb-pipeline-builder/operators';

$DateToString('$date', '%Y-%m-%d')
```

**Output:**
```typescript
{ $dateToString: { date: '$date', format: '%Y-%m-%d' } }
```

**Common formats:**
- `%Y-%m-%d` → 2024-12-31
- `%Y-%m-%d %H:%M:%S` → 2024-12-31 23:59:59
- `%d/%m/%Y` → 31/12/2024

---

### $DateFromString

Parse string to date.

```typescript
import { $DateFromString } from 'mongodb-pipeline-builder/operators';

$DateFromString('$dateString', '%Y-%m-%d')
```

**Output:**
```typescript
{ $dateFromString: { dateString: '$dateString', format: '%Y-%m-%d' } }
```

---

### $DateTrunc

Truncate date to unit.

```typescript
import { $DateTrunc } from 'mongodb-pipeline-builder/operators';

$DateTrunc('$date', 'day') // Start of day
```

**Output:**
```typescript
{ $dateTrunc: { date: '$date', unit: 'day' } }
```

---

### $Year

Extract year from date.

```typescript
import { $Year } from 'mongodb-pipeline-builder/operators';

$Year('$date')
```

**Output:**
```typescript
{ $year: '$date' }
```

---

### $Month

Extract month from date (1-12).

```typescript
import { $Month } from 'mongodb-pipeline-builder/operators';

$Month('$date')
```

**Output:**
```typescript
{ $month: '$date' }
```

---

### $DayOfMonth

Extract day of month (1-31).

```typescript
import { $DayOfMonth } from 'mongodb-pipeline-builder/operators';

$DayOfMonth('$date')
```

**Output:**
```typescript
{ $dayOfMonth: '$date' }
```

---

### $DayOfWeek

Extract day of week (1=Sunday, 7=Saturday).

```typescript
import { $DayOfWeek } from 'mongodb-pipeline-builder/operators';

$DayOfWeek('$date')
```

**Output:**
```typescript
{ $dayOfWeek: '$date' }
```

---

### $DayOfYear

Extract day of year (1-366).

```typescript
import { $DayOfYear } from 'mongodb-pipeline-builder/operators';

$DayOfYear('$date')
```

**Output:**
```typescript
{ $dayOfYear: '$date' }
```

---

### $Hour

Extract hour (0-23).

```typescript
import { $Hour } from 'mongodb-pipeline-builder/operators';

$Hour('$date')
```

**Output:**
```typescript
{ $hour: '$date' }
```

---

### $Minute

Extract minute (0-59).

```typescript
import { $Minute } from 'mongodb-pipeline-builder/operators';

$Minute('$date')
```

**Output:**
```typescript
{ $minute: '$date' }
```

---

### $Second

Extract second (0-59).

```typescript
import { $Second } from 'mongodb-pipeline-builder/operators';

$Second('$date')
```

**Output:**
```typescript
{ $second: '$date' }
```

---

### $Millisecond

Extract millisecond (0-999).

```typescript
import { $Millisecond } from 'mongodb-pipeline-builder/operators';

$Millisecond('$date')
```

**Output:**
```typescript
{ $millisecond: '$date' }
```

---

### $Week

Extract week number (0-53).

```typescript
import { $Week } from 'mongodb-pipeline-builder/operators';

$Week('$date')
```

**Output:**
```typescript
{ $week: '$date' }
```

---

### $IsoWeek

Extract ISO week number (1-53).

```typescript
import { $IsoWeek } from 'mongodb-pipeline-builder/operators';

$IsoWeek('$date')
```

**Output:**
```typescript
{ $isoWeek: '$date' }
```

---

### $IsoWeekYear

Extract ISO week year.

```typescript
import { $IsoWeekYear } from 'mongodb-pipeline-builder/operators';

$IsoWeekYear('$date')
```

**Output:**
```typescript
{ $isoWeekYear: '$date' }
```

---

### $IsoDayOfWeek

Extract ISO day of week (1=Monday, 7=Sunday).

```typescript
import { $IsoDayOfWeek } from 'mongodb-pipeline-builder/operators';

$IsoDayOfWeek('$date')
```

**Output:**
```typescript
{ $isoDayOfWeek: '$date' }
```

---

## Conditional Operators

### $Condition

If-then-else logic.

```typescript
import { $Condition } from 'mongodb-pipeline-builder/operators';

$Condition(
  $GreaterThan('$age', 18),
  'adult',
  'minor'
)
```

**Output:**
```typescript
{
  $cond: [
    { $gt: ['$age', 18] },
    'adult',
    'minor'
  ]
}
```

**Example:**
```typescript
builder.AddFields(
  Field('ageGroup', $Condition(
    $GreaterThanEqual('$age', 18),
    'Adult',
    'Minor'
  ))
)
```

---

### $IfNull

Return alternative if value is null.

```typescript
import { $IfNull } from 'mongodb-pipeline-builder/operators';

$IfNull('$nickname', '$name')
```

**Output:**
```typescript
{ $ifNull: ['$nickname', '$name'] }
```

**Example:**
```typescript
builder.AddFields(
  Field('displayName', $IfNull('$nickname', '$name'))
)
```

---

### $Switch

Switch-case logic.

```typescript
import { $Switch } from 'mongodb-pipeline-builder/operators';

$Switch(
  [
    { case: $Equal('$status', 'active'), then: 'Active' },
    { case: $Equal('$status', 'pending'), then: 'Pending' },
    { case: $Equal('$status', 'suspended'), then: 'Suspended' }
  ],
  'Unknown' // default
)
```

**Output:**
```typescript
{
  $switch: {
    branches: [
      { case: { $eq: ['$status', 'active'] }, then: 'Active' },
      { case: { $eq: ['$status', 'pending'] }, then: 'Pending' },
      { case: { $eq: ['$status', 'suspended'] }, then: 'Suspended' }
    ],
    default: 'Unknown'
  }
}
```

---

## Type Operators

### $Type

Get BSON type of field.

```typescript
import { $Type } from 'mongodb-pipeline-builder/operators';

$Type('$value')
```

**Output:**
```typescript
{ $type: '$value' }
```

**Returns:** String like `"string"`, `"int"`, `"double"`, `"array"`, `"object"`, etc.

---

### $IsNumber

Check if value is a number.

```typescript
import { $IsNumber } from 'mongodb-pipeline-builder/operators';

$IsNumber('$value')
```

**Output:**
```typescript
{ $isNumber: '$value' }
```

---

### $Convert

Convert value to different type.

```typescript
import { $Convert } from 'mongodb-pipeline-builder/operators';

$Convert('$stringNumber', 'int')
```

**Output:**
```typescript
{ $convert: { input: '$stringNumber', to: 'int' } }
```

**Types:** `double`, `string`, `objectId`, `bool`, `date`, `int`, `long`, `decimal`

---

### $ToString

Convert to string.

```typescript
import { $ToString } from 'mongodb-pipeline-builder/operators';

$ToString('$number')
```

**Output:**
```typescript
{ $toString: '$number' }
```

---

### $ToInt

Convert to 32-bit integer.

```typescript
import { $ToInt } from 'mongodb-pipeline-builder/operators';

$ToInt('$stringNumber')
```

**Output:**
```typescript
{ $toInt: '$stringNumber' }
```

---

### $ToLong

Convert to 64-bit integer.

```typescript
import { $ToLong } from 'mongodb-pipeline-builder/operators';

$ToLong('$stringNumber')
```

**Output:**
```typescript
{ $toLong: '$stringNumber' }
```

---

### $ToDouble

Convert to double.

```typescript
import { $ToDouble } from 'mongodb-pipeline-builder/operators';

$ToDouble('$stringNumber')
```

**Output:**
```typescript
{ $toDouble: '$stringNumber' }
```

---

### $ToDecimal

Convert to decimal128.

```typescript
import { $ToDecimal } from 'mongodb-pipeline-builder/operators';

$ToDecimal('$stringNumber')
```

**Output:**
```typescript
{ $toDecimal: '$stringNumber' }
```

---

### $ToBool

Convert to boolean.

```typescript
import { $ToBool } from 'mongodb-pipeline-builder/operators';

$ToBool('$value')
```

**Output:**
```typescript
{ $toBool: '$value' }
```

---

### $ToDate

Convert to date.

```typescript
import { $ToDate } from 'mongodb-pipeline-builder/operators';

$ToDate('$stringDate')
```

**Output:**
```typescript
{ $toDate: '$stringDate' }
```

---

### $ToObjectId

Convert to ObjectId.

```typescript
import { $ToObjectId } from 'mongodb-pipeline-builder/operators';

$ToObjectId('$stringId')
```

**Output:**
```typescript
{ $toObjectId: '$stringId' }
```

---

## Accumulator Operators

These operators are typically used in `$group` stages.

### $Sum

Sum values.

```typescript
import { $Sum } from 'mongodb-pipeline-builder/operators';

// In $group
builder.Group({
  _id: '$category',
  total: $Sum('$amount'),
  count: $Sum(1) // Count documents
})
```

**Output:**
```typescript
{ $sum: '$amount' }
{ $sum: 1 }
```

---

### $Average

Calculate average.

```typescript
import { $Average } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$category',
  avgPrice: $Average('$price')
})
```

**Output:**
```typescript
{ $avg: '$price' }
```

---

### $Min

Get minimum value.

```typescript
import { $Min } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$category',
  minPrice: $Min('$price')
})
```

**Output:**
```typescript
{ $min: '$price' }
```

---

### $Max

Get maximum value.

```typescript
import { $Max } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$category',
  maxPrice: $Max('$price')
})
```

**Output:**
```typescript
{ $max: '$price' }
```

---

### $First

Get first value in group.

```typescript
import { $First } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$userId',
  firstOrder: $First('$orderDate')
})
```

**Output:**
```typescript
{ $first: '$orderDate' }
```

---

### $Last

Get last value in group.

```typescript
import { $Last } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$userId',
  lastOrder: $Last('$orderDate')
})
```

**Output:**
```typescript
{ $last: '$orderDate' }
```

---

### $Push

Accumulate values into array.

```typescript
import { $Push } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$userId',
  orders: $Push('$orderId')
})
```

**Output:**
```typescript
{ $push: '$orderId' }
```

---

### $AddToSet

Accumulate unique values into array.

```typescript
import { $AddToSet } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$userId',
  uniqueCategories: $AddToSet('$category')
})
```

**Output:**
```typescript
{ $addToSet: '$category' }
```

---

### $StdDevPop

Calculate population standard deviation.

```typescript
import { $StdDevPop } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$category',
  priceStdDev: $StdDevPop('$price')
})
```

**Output:**
```typescript
{ $stdDevPop: '$price' }
```

---

### $StdDevSamp

Calculate sample standard deviation.

```typescript
import { $StdDevSamp } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$category',
  priceStdDev: $StdDevSamp('$price')
})
```

**Output:**
```typescript
{ $stdDevSamp: '$price' }
```

---

## Set Operators

Operations on arrays treated as sets.

### $SetUnion

Union of arrays (unique values).

```typescript
import { $SetUnion } from 'mongodb-pipeline-builder/operators';

$SetUnion('$array1', '$array2')
```

**Output:**
```typescript
{ $setUnion: ['$array1', '$array2'] }
```

---

### $SetIntersection

Intersection of arrays.

```typescript
import { $SetIntersection } from 'mongodb-pipeline-builder/operators';

$SetIntersection('$array1', '$array2')
```

**Output:**
```typescript
{ $setIntersection: ['$array1', '$array2'] }
```

---

### $SetDifference

Elements in first array but not in second.

```typescript
import { $SetDifference } from 'mongodb-pipeline-builder/operators';

$SetDifference('$array1', '$array2')
```

**Output:**
```typescript
{ $setDifference: ['$array1', '$array2'] }
```

---

### $SetEquals

Check if arrays have same elements.

```typescript
import { $SetEquals } from 'mongodb-pipeline-builder/operators';

$SetEquals('$array1', '$array2')
```

**Output:**
```typescript
{ $setEquals: ['$array1', '$array2'] }
```

---

### $SetIsSubset

Check if first array is subset of second.

```typescript
import { $SetIsSubset } from 'mongodb-pipeline-builder/operators';

$SetIsSubset('$subset', '$superset')
```

**Output:**
```typescript
{ $setIsSubset: ['$subset', '$superset'] }
```

---

### $AllElementsTrue

Check if all array elements are true.

```typescript
import { $AllElementsTrue } from 'mongodb-pipeline-builder/operators';

$AllElementsTrue('$booleanArray')
```

**Output:**
```typescript
{ $allElementsTrue: ['$booleanArray'] }
```

---

### $AnyElementTrue

Check if any array element is true.

```typescript
import { $AnyElementTrue } from 'mongodb-pipeline-builder/operators';

$AnyElementTrue('$booleanArray')
```

**Output:**
```typescript
{ $anyElementTrue: ['$booleanArray'] }
```

---

## Trigonometry Operators

### $Sin

Sine of angle (radians).

```typescript
import { $Sin } from 'mongodb-pipeline-builder/operators';

$Sin('$angle')
```

**Output:**
```typescript
{ $sin: '$angle' }
```

---

### $Cos

Cosine of angle (radians).

```typescript
import { $Cosine } from 'mongodb-pipeline-builder/operators';

$Cosine('$angle')
```

**Output:**
```typescript
{ $cos: '$angle' }
```

---

### $Tan

Tangent of angle (radians).

```typescript
import { $Tan } from 'mongodb-pipeline-builder/operators';

$Tan('$angle')
```

**Output:**
```typescript
{ $tan: '$angle' }
```

---

### $Sinh

Hyperbolic sine.

```typescript
import { $Sinh } from 'mongodb-pipeline-builder/operators';

$Sinh('$value')
```

**Output:**
```typescript
{ $sinh: '$value' }
```

---

### $Cosh

Hyperbolic cosine.

```typescript
import { $CosineHyperbolic } from 'mongodb-pipeline-builder/operators';

$CosineHyperbolic('$value')
```

**Output:**
```typescript
{ $cosh: '$value' }
```

---

### $Tanh

Hyperbolic tangent.

```typescript
import { $Tanh } from 'mongodb-pipeline-builder/operators';

$Tanh('$value')
```

**Output:**
```typescript
{ $tanh: '$value' }
```

---

### $ArcSine

Arc sine (inverse sine).

```typescript
import { $ArcSine } from 'mongodb-pipeline-builder/operators';

$ArcSine('$value')
```

**Output:**
```typescript
{ $asin: '$value' }
```

---

### $ArcCosine

Arc cosine (inverse cosine).

```typescript
import { $ArcCosine } from 'mongodb-pipeline-builder/operators';

$ArcCosine('$value')
```

**Output:**
```typescript
{ $acos: '$value' }
```

---

### $ArcTangent

Arc tangent (inverse tangent).

```typescript
import { $ArcTangent } from 'mongodb-pipeline-builder/operators';

$ArcTangent('$value')
```

**Output:**
```typescript
{ $atan: '$value' }
```

---

### $ArcTangent2

Two-argument arc tangent.

```typescript
import { $ArcTangent2 } from 'mongodb-pipeline-builder/operators';

$ArcTangent2('$y', '$x')
```

**Output:**
```typescript
{ $atan2: ['$y', '$x'] }
```

---

### $DegreesToRadians

Convert degrees to radians.

```typescript
import { $DegreesToRadians } from 'mongodb-pipeline-builder/operators';

$DegreesToRadians('$degrees')
```

**Output:**
```typescript
{ $degreesToRadians: '$degrees' }
```

---

### $RadiansToDegrees

Convert radians to degrees.

```typescript
import { $RadiansToDegrees } from 'mongodb-pipeline-builder/operators';

$RadiansToDegrees('$radians')
```

**Output:**
```typescript
{ $radiansToDegrees: '$radians' }
```

---

## Bitwise Operators

### $BitwiseAnd

Bitwise AND.

```typescript
import { $BitwiseAnd } from 'mongodb-pipeline-builder/operators';

$BitwiseAnd('$value1', '$value2')
```

**Output:**
```typescript
{ $bitAnd: ['$value1', '$value2'] }
```

---

### $BitwiseOr

Bitwise OR.

```typescript
import { $BitwiseOr } from 'mongodb-pipeline-builder/operators';

$BitwiseOr('$value1', '$value2')
```

**Output:**
```typescript
{ $bitOr: ['$value1', '$value2'] }
```

---

### $BitwiseXor

Bitwise XOR.

```typescript
import { $BitwiseXor } from 'mongodb-pipeline-builder/operators';

$BitwiseXor('$value1', '$value2')
```

**Output:**
```typescript
{ $bitXor: ['$value1', '$value2'] }
```

---

### $BitwiseNot

Bitwise NOT.

```typescript
import { $BitwiseNot } from 'mongodb-pipeline-builder/operators';

$BitwiseNot('$value')
```

**Output:**
```typescript
{ $bitNot: '$value' }
```

---

## Custom Operators

### $Expression

Wrap an expression for use in $match.

```typescript
import { $Expression } from 'mongodb-pipeline-builder/operators';

builder.Match($Expression($GreaterThan('$price', 100)))
```

**Output:**
```typescript
{ $expr: { $gt: ['$price', 100] } }
```

**Usage:** Required when using aggregation operators in `$match` stage.

---

### $Literal

Treat value as literal (prevent interpretation).

```typescript
import { $Literal } from 'mongodb-pipeline-builder/operators';

$Literal('$price') // Treats "$price" as string, not field reference
```

**Output:**
```typescript
{ $literal: '$price' }
```

---

### $Let

Define and use variables.

```typescript
import { $Let } from 'mongodb-pipeline-builder/operators';

$Let(
  { total: $Multiply('$price', '$quantity') },
  $Add('$$total', '$tax')
)
```

**Output:**
```typescript
{
  $let: {
    vars: { total: { $multiply: ['$price', '$quantity'] } },
    in: { $add: ['$$total', '$tax'] }
  }
}
```

---

### $MergeObjects

Merge multiple objects.

```typescript
import { $MergeObjects } from 'mongodb-pipeline-builder/operators';

$MergeObjects('$object1', '$object2', { newField: 'value' })
```

**Output:**
```typescript
{ $mergeObjects: ['$object1', '$object2', { newField: 'value' }] }
```

---

### $GetField

Get field value by name.

```typescript
import { $GetField } from 'mongodb-pipeline-builder/operators';

$GetField('fieldName', '$object')
```

**Output:**
```typescript
{ $getField: { field: 'fieldName', input: '$object' } }
```

---

### $Rand

Generate random number between 0 and 1.

```typescript
import { $Rand } from 'mongodb-pipeline-builder/operators';

$Rand()
```

**Output:**
```typescript
{ $rand: {} }
```

---

### $SampleRate

Sample documents by rate.

```typescript
import { $SampleRate } from 'mongodb-pipeline-builder/operators';

$SampleRate(0.1) // 10% sample rate
```

**Output:**
```typescript
{ $sampleRate: 0.1 }
```

---

## Complete Example

Here's a comprehensive example using multiple operators:

```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { ProjectOnlyHelper, Field } from 'mongodb-pipeline-builder/helpers';
import {
  $Expression,
  $And,
  $Equal,
  $GreaterThan,
  $Concat,
  $ToUpper,
  $Multiply,
  $Add,
  $Condition,
  $DateToString,
  $Size,
  $Filter
} from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('complex-query')
  // Filter: Active users over 18
  .Match($Expression($And(
    $Equal('$status', 'active'),
    $GreaterThan('$age', 18)
  )))
  
  // Add computed fields
  .AddFields(
    // Full name in uppercase
    Field('displayName', $ToUpper($Concat('$firstName', ' ', '$lastName'))),
    
    // Calculate total with tax
    Field('totalWithTax', $Add(
      $Multiply('$price', '$quantity'),
      '$tax'
    )),
    
    // Categorize by age
    Field('ageCategory', $Condition(
      $GreaterThan('$age', 65),
      'Senior',
      $Condition(
        $GreaterThan('$age', 18),
        'Adult',
        'Minor'
      )
    )),
    
    // Format date
    Field('formattedDate', $DateToString('$createdAt', '%Y-%m-%d')),
    
    // Filter items over $100
    Field('expensiveItems', $Filter(
      '$items',
      'item',
      $GreaterThan('$$item.price', 100)
    )),
    
    // Count expensive items
    Field('expensiveItemCount', $Size(
      $Filter('$items', 'item', $GreaterThan('$$item.price', 100))
    ))
  )
  
  // Select fields
  .Project(ProjectOnlyHelper(
    'displayName',
    'totalWithTax',
    'ageCategory',
    'formattedDate',
    'expensiveItemCount'
  ))
  
  .build();
```

---

## Summary

### Operator Categories

| Category | Count | Common Uses |
|----------|-------|-------------|
| **Comparison** | 7 | Filtering, conditionals |
| **Logical** | 3 | Combining conditions |
| **Arithmetic** | 15+ | Calculations, math operations |
| **Array** | 15+ | Array manipulation, filtering |
| **String** | 20+ | Text processing, formatting |
| **Date** | 20+ | Date manipulation, formatting |
| **Conditional** | 3 | If-then-else logic |
| **Type** | 10+ | Type checking, conversion |
| **Accumulator** | 10+ | Grouping, aggregation |
| **Set** | 7 | Set operations on arrays |
| **Trigonometry** | 12+ | Mathematical functions |
| **Bitwise** | 4 | Bit operations |
| **Custom** | 7+ | Special MongoDB operations |

### Common Patterns

**1. Conditional Field:**
```typescript
Field('status', $Condition($Equal('$active', true), 'Active', 'Inactive'))
```

**2. Full Name:**
```typescript
Field('fullName', $Concat('$firstName', ' ', '$lastName'))
```

**3. Total Price:**
```typescript
Field('total', $Multiply('$price', '$quantity'))
```

**4. Age from Birthdate:**
```typescript
Field('age', $DateDifference('$birthDate', new Date(), 'year'))
```

**5. Count Array Items:**
```typescript
Field('itemCount', $Size('$items'))
```

**6. Filter Array:**
```typescript
Field('activeItems', $Filter('$items', 'item', $Equal('$$item.active', true)))
```

---

## Related Documentation

- [Getting Started](../getting-started.md)
- [Pipeline Stages](./stages.md)
- [Helpers Reference](./helpers.md)
- [Pagination Examples](../examples/pagination.md)
- [Lookup Examples](../examples/lookups.md)

