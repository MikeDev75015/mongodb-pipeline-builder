<div style="text-align: center; width: 100%;">

<div style="display: inline-block">

[![NPM version](https://img.shields.io/npm/v/mongodb-pipeline-builder.svg)](https://www.npmjs.com/package/mongodb-pipeline-builder)
![NPM](https://img.shields.io/npm/l/mongodb-pipeline-builder?registry_uri=https%3A%2F%2Fregistry.npmjs.com)
![npm](https://img.shields.io/npm/dw/mongodb-pipeline-builder)
</div>

<div style="display: inline-block">

![GitHub branch checks state](https://img.shields.io/github/checks-status/MikeDev75015/mongodb-pipeline-builder/main)
[![CircleCI](https://circleci.com/gh/MikeDev75015/mongodb-pipeline-builder.svg?style=shield)](https://app.circleci.com/pipelines/github/MikeDev75015/mongodb-pipeline-builder)
![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)
</div>
</div>

<div style="text-align: center; width: 100%;">
<div style="display: inline-block">

![Sonar Tests](https://img.shields.io/sonar/tests/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Coverage](https://img.shields.io/sonar/coverage/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)
<img src="https://mikedev75015.github.io/mongodb-pipeline-builder/images/coverage-badge-documentation.svg" alt="documentation-badge">
</div>

<div style="display: inline-block">

![GitHub top language](https://img.shields.io/github/languages/top/MikeDev75015/mongodb-pipeline-builder)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=ncloc)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
</div>
</div>

<div style="text-align: center; width: 100%;">
<div style="display: inline-block">

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/MikeDev75015/mongodb-pipeline-builder)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/MikeDev75015/mongodb-pipeline-builder)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/MikeDev75015/mongodb-pipeline-builder/main)
</div>

<div style="display: inline-block">

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=security_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
</div>
</div>

<div style="text-align: center; width: 100%;">

[-> Technical documentation <-](https://mikedev75015.github.io/mongodb-pipeline-builder)

# mongodb-pipeline-builder

</div>


<p style="text-align: justify; width: 100%;font-size: 15px;">

**mongodb-pipeline-builder** is a pipeline builder for the [db.collection.aggregate](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/) method, the db.aggregate method and the mongoose model aggregate method.

- Simplify pipelines by making them more readable
- Pipelines are easier to edit. 
- Pipelines are testable on a dataset. 
- Pipeline stages appear in an array. 
- Sequential stages for documents

</p>

## npm package <img src="https://pbs.twimg.com/media/EDoWJbUXYAArclg.png" width="24" height="24" />

### `npm i -S mongodb-pipeline-builder`

## Usage:


### Using `require()`

```typescript
const PipelineBuilder = require("mongodb-pipeline-builder").PipelineBuilder;
const { LookupEqualityHelper, ProjectOnlyHelper, Field } = require('mongodb-pipeline-builder/helpers');
const { $LessThanEqual, $ArrayElemAt, $Equal, $Expression } = require('mongodb-pipeline-builder/operators');
```

### Using `import`


```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { LookupEqualityHelper, ProjectOnlyHelper, Field } from 'mongodb-pipeline-builder/helpers';
import { $LessThanEqual, $ArrayElemAt, $Equal, $Expression } from 'mongodb-pipeline-builder/operators';
```

## Pagination example


```typescript
const myNewPipeline = new PipelineBuilder( 'myPagination', { debug: true } )
    .Match( $Expression( $LessThanEqual( '$id', 20 ) ) )
    .Project( ProjectOnlyHelper( 'name', 'weight' ) )
    .Paging( 5, 3 ) // 5 per page, page 3
    .getPipeline();
```

*is equivalent to*


```typescript
const myNewPipeline = [ {
    $facet: {
        docs: [
            { $match: { $expr: { $lte: ["$id", 20] } } },
            { $project: { _id: 0, name: 1, weight: 1 } },
            { $skip: 10 },
            { $limit: 5 }
        ],
        count: [
            { $match: { $expr: { $lte: ["$id", 20] } } },
            { $count: "totalElements" }
        ]
    }
} ];
```

## No pagination example

```typescript
const myNewPipeline = new PipelineBuilder( 'user-skills' )
    .Match( $Expression( $Equal( '$id', 123456 ) ) )
    .Lookup( LookupEqualityHelper( 'profiles', 'profile', 'profileId', 'id' ) )
    .Project( ProjectOnlyHelper( 'firstname', 'lastname', 'email' ) )
    .AddFields(
        Field( 'skills', $ArrayElemAt( '$profile.skills', 0 ) ),
        Field( 'availability', $ArrayElemAt( '$profile.availability', 0 ) )
    )
    .Unset( 'profile' )
    .getPipeline();
```

*is equivalent to*

```typescript
const myNewPipeline = [
    { $match: { $expr: { $eq: ["$id", 123456] } } },
    { $lookup: { from: "profiles", as: "profile", localField: "profileId", foreignField: "id" } },
    { $project: { _id: 0, firstname: 1, lastname: 1, email: 1 } },
    { $addFields: {
        skills: { $arrayElemAt: ["$profile.skills", 0] },
        availability: { $arrayElemAt: ["$profile.availability", 0] }
    } },
    { $unset: "profile" }
];
```

___

#  GetResult method (No pagination)

```typescript
GetResult<T = any>(): Promise<GetResultResponse<T>>
```

<p style="font-size: 15px;">

`GetResult()` is an **asynchronous** method that provides a very easy way to use aggregation pipelines on a target (collection or mongoose model having the aggregation method).

<p>

### Welcome
<p style="font-size: 11px;">

`<T = any>` It is now possible to **type** the response.

<p>

## GetResultResponse

<p style="font-size: 15px;">

Without pagination, the `GetResult<T>()` method returns a GetResultResponse object that contains two methods:<br>

- `GetDocs(): T[]` to get the documents found.
- `GetElement(): T` to get a particular document.
- `GetCount(): number` to get the total number of documents found.

</p>


```typescript
const result = await GetResult<DocType>( target, pipeline ); 
result.GetDocs(); // () => DocType[]
result.GetElement(); // () => DocType
result.GetCount(); // () => number
```

*$Or*
```typescript
GetResult<DocType>( target, pipeline ).then( result => {
    result.GetDocs(); // () => DocType[]
    result.GetElement(); // () => DocType
    result.GetCount(); // () => number
} );
```

### `GetElement(index: number | 'last')` method possibilities:

<p style="font-size: 15px;">
A particular document can be retrieved by specifying its index as an argument of the `GetDocs()` method.

To get the last document, the argument to provide is the string `'last'`. 

If the specified index is greater than the index of the last document, `GetElement()` will return undefined.
</p>

```typescript
// GetDocs() -> [document1, document2, document3, ..., document51]
result.GetElement(2); // will return document to index 2, document1
result.GetElement('last'); // will return the last document, document51
result.GetElement(99); // will return undefined
```

#  GetPagingResult method (Pagination)

```typescript
GetPagingResult<T = any>(): Promise<GetPagingResultResponse<T>>
```

<p style="font-size: 15px;">

`GetPagingResult()` is an **asynchronous** method that provides a very easy way to use aggregation pipelines on a target (collection or mongoose model having the aggregation method) for pagination.

<p>

### Again
<p style="font-size: 11px;">

`<T = any>` It is also possible to **type** the response.

<p>

## GetPagingResultResponse

<p style="font-size: 15px;">

With pagination,  `GetPagingResult<T>()` returns a `GetPagingResultResponse` object that contains three methods:
- `GetDocs()` to get the documents found.
- `GetCount()` to get the total number of documents found.
- `GetTotalPageNumber()` to get the total number of pages.

</p>


```typescript
const result = await GetPagingResult<DocType>(target, pipeline);
result.GetDocs(); // () => DocType[]
result.GetCount(); // () => number
result.GetTotalPageNumber(); // () => number
```

*$Or*
```typescript
GetPagingResult<DocType>(target, pipeline).then( result => {
    result.GetDocs(); // () => DocType[]
    result.GetCount(); // () => number
    result.GetTotalPageNumber(); // () => number
} );
```


___


[=> Try the lib on NPM RunKit with the require method <=](https://npm.runkit.com/mongodb-pipeline-builder)

[=> Aggregation Pipeline Stages <=](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)


## SPECIAL STAGE:

- Paging

## MONGODB NATIVE STAGES:
- AddFields 
- Bucket 
- BucketAuto 
- CollStats 
- Count 
- Facet 
- GeoNear 
- GraphLookup 
- Group 
- IndexStats 
- Limit 
- ListSessions 
- Lookup 
- Match 
- Merge 
- Out 
- PlanCacheStats 
- Project 
- Redact 
- ReplaceRoot 
- ReplaceWith 
- Sample 
- Search 
- Set 
- Skip 
- Sort 
- SortByCount 
- UnionWith 
- Unset 
- Unwind

___

<div style="text-align: center; width: 100%;">

[-> Aggregation Pipeline Helpers <-](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)

</div> 

## STAGE HELPERS <span style="color: red">*</span> :

- Bucket ( **BucketGroupByHelper** )
- BucketAuto ( **BucketAutoGroupByHelper** )
- CurrentOp ( **CurrentOpHelper** )
- GeoNear ( **GeoNearHelper** )
- Lookup ( **LookupConditionHelper** | **LookupEqualityHelper** )
- Merge ( **MergeIntoHelper** )
- Out ( **OutDbCollHelper** )
- Project ( **ProjectIgnoreHelper** | **ProjectOnlyHelper** )
- Sample ( **SampleSizeHelper** )
- UnionWith ( **UnionWithCollectionHelper** )

## COMMON HELPERS:

- Match( **Field** )
- AddFields( **Field**** )
- Facet( **Field**** )
- Set( **Field**** )
- Sort( **Field**** )
- List( **Field**** )


<p style="font-style: italic">
<span style="color: red; font-size: 24px">*</span> If no helper is available for a stage, use stage method and pass it a valid value as a parameter.<br>
** One or more Field helper(s) separated by a comma.
</p>
___
<div style="text-align: center; width: 100%;">

[-> Aggregation Pipeline Operators <-](https://docs.mongodb.com/manual/reference/operator/aggregation/)

</div>
<p style="font-size: 15px;">
$Absolute | $Accumulator | $Acos | $Acosh | $Add | $AddToSet | $AllElementsTrue | $And | $AnyElementTrue | $ArrayElemAt | $ArrayToObject | $Asin | $Asinh | $Atan | $Atan2 | $Atanh | $Avg | $BinarySize | $BsonSize | $Ceil | $Compare | $Concat | $ConcatArrays | $Cond | $Convert | $Cos | $Cosh | $DateFromParts | $DateFromString | $DateToParts | $DateToString | $DayOfMonth | $DayOfWeek | $DayOfYear | $DegreesToRadians | $Divide | $Equal | $Exponent | $Expression | $Filter | $First | $Floor | $FunctionOperator | $GreaterThan | $GreaterThanEqual | $Hour | $IfNull | $In | $IndexOfArray | $IndexOfBytes | $IndexOfCP | $IsArray | $IsNumber | $IsoDayOfWeek | $IsoWeek | $IsoWeekYear | $Last | $LessThan | $LessThanEqual | $Let | $Literal | $Log | $Log10 | $Ltrim | $Map | $Max | $MergeObjects | $Meta | $Millisecond | $Min | $Minute | $Mod | $Month | $Multiply | $NaturalLog | $Not | $NotEqual | $ObjectToArray | $Or | $Pow | $Push | $RadiansToDegrees | $Rand | $Range | $Reduce | $RegexFind | $RegexFindAll | $RegexMatch | $ReplaceAll | $ReplaceOne | $ReverseArray | $Round | $Rtrim | $SampleRate | $Second | $SetDifference | $SetEquals | $SetIntersection | $SetIsSubset | $SetUnion | $Sin | $Sinh | $Size | $Slice | $Split | $Sqrt | $StdDevPop | $StdDevSamp | $StrCaseCmp | $StrLenBytes | $StrLenCP | $Substr | $SubstrBytes | $SubstrCP | $Subtract | $Sum | $Switch | $Tan | $Tanh | $ToBool | $ToDate | $ToDecimal | $ToDouble | $ToInt | $ToLong | $ToLower | $ToObjectId | $ToString | $ToUpper | $Trim | $Trunc | $Type | $Week | $Year | $Zip
</p>
