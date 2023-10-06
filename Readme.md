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

---

<div style="text-align: center; width: 100%;">

[-> Technical documentation <-](https://mikedev75015.github.io/mongodb-pipeline-builder)



# mongodb-pipeline-builder

</div>


<p style="text-align: justify; width: 100%;font-size: 15px;">

**mongodb-pipeline-builder** is a pipeline builder for the [db.collection.aggregate](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/), the [db.aggregate](https://www.mongodb.com/docs/v7.0/reference/method/db.aggregate/) and the mongoose [Model.aggregate](https://mongoosejs.com/docs/api/aggregate.html#Aggregate()) methods.

- Simplify pipelines by making them more readable
- Pipelines are easier to edit. 
- Pipelines are testable on a dataset. 
- Pipeline stages appear in an array. 
- Sequential stages for documents

</p>

---

## npm package <img src="https://pbs.twimg.com/media/EDoWJbUXYAArclg.png" width="24" height="24" />

`npm i -S mongodb-pipeline-builder`


---


> **Breaking changes between v3 and v4**

-  **Helpers**
 
   > Replacing the Payload suffix with Helper suffix
   > 
   > Prefixed with the name of the pipeline stage where they should be used


-  **Operators**

   > Prefixed with the **$** symbol
   > 
   > Rename `MapOperator` to `$Map`


- **GetResult**

  > To be used only if no Paging stage is set
  > 
  > Adding new GetElement method to the response object
  > 
  > Removing GetDocs method arguments


- **GetPagingResult**

  > To be used exclusively with Paging stage.

  
*Welcome generics! `GetResult<Type>` and `GetPagingResult<Type>` now offer the ability to type responses*

---

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

---

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

---

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

`GetResult<T>()` is an **asynchronous** method that provides a very easy way to use aggregation responses.

<p>


<p style="font-size: 15px;">

This method returns a `GetResultResponse` object that contains 3 methods:<br>

- `GetDocs(): T[]` to get all the documents that match the request.
- `GetElement(index: number | 'last'): T` to get a particular document by its index.
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

- A particular document can be retrieved by specifying its index.
- To get the last document, simply provide the string `'last'`. 
- If the specified index is greater than the index of the last document, `GetElement()` will return undefined.
</p>

```typescript
// GetDocs() -> [document1, document2, document3, ..., document51]
result.GetElement(2); // will return document to index 2, document1
result.GetElement('last'); // will return the last document, document51
result.GetElement(99); // will return undefined
```

---

#  GetPagingResult method (Pagination)

```typescript
GetPagingResult<T = any>(): Promise<GetPagingResultResponse<T>>
```

<p style="font-size: 15px;">

`GetPagingResult<T>()` is an **asynchronous** method that provides a very easy way to use aggregation responses when **Paging** stage is used.

<p>


<p style="font-size: 15px;">

This method returns a `GetPagingResultResponse` object that contains three methods:
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




## BONUS STAGE

### `Paging(elementsPerPage: number, page = 1)`

  *The Paging stage automatically adds 3 native stages used to paginate documents ($skip, $limit and $count).*

```typescript
// const builder = new PipelineBuilder('example');
builder.Match('query').Paging(5, 2).getPipeline();
// pipeline
[
  {
    '$facet': {
      docs: [ { '$match': 'query' }, { '$skip': 5 }, { '$limit': 5 } ],
      count: [ { '$match': 'query' }, { '$count': 'totalElements' } ]
    }
  }
]
// For use with the GetPagingResult method
```


## [MONGODB STAGES](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)

### `AddFields(...values: { [key: string]: any }[])`
#### Helper: `Field`
```typescript
// const builder = new PipelineBuilder('example');
builder.Match('query').AddFields(Field('foo', 'value1'), Field('bar', 'value2')).getPipeline();
// pipeline
[ { '$match': 'query' }, { '$addFields': { foo: 'value1', bar: 'value2' } } ]
// For use with the GetResult method
```

### `Bucket(value: BucketStage)`
#### Helper: `BucketGroupByHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.Bucket(BucketGroupByHelper('$age', [6, 13, 18])).getPipeline();
// pipeline
[
  {
    '$bucket': {
      groupBy: '$age',
      boundaries: [ 6, 13, 18 ],
      output: { count: { '$sum': 1 } }
    }
  }
]
// For use with the GetResult method
```

### `BucketAuto(value: BucketAutoStage)`
#### Helper: `BucketAutoGroupByHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.BucketAuto(BucketAutoGroupByHelper('$age', 5)).getPipeline();
// pipeline
[
  {
    '$bucketAuto': { groupBy: '$age', buckets: 5, output: { count: { '$sum': 1 } } }
  }
]
// For use with the GetResult method
```

### `CollStats(value: CollStatsStage)`
```typescript
// const builder = new PipelineBuilder('example');
builder.CollStats({ latencyStats: { histograms: true } }).getPipeline();
// pipeline
[
  { '$collStats': { latencyStats: { histograms: true } } }
]
// For use with the GetResult method
```

### `Count(value: string)`
```typescript
// const builder = new PipelineBuilder('example');
builder.Count('counter').getPipeline();
// pipeline
[ { '$count': 'counter' } ]
// For use with the GetResult method
```

### `CurrentOp(value: CurrentOp)`
#### Helper: `CurrentOpHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.CurrentOp(CurrentOpHelper({ allUsers: true, idleConnections: true })).getPipeline();
// pipeline
[
  {
    '$currentOp': {
      allUsers: true,
      idleConnections: true,
      idleCursors: false,
      idleSessions: true,
      localOps: false,
      backtrace: false
    }
  }
]
// For use with the GetResult method
```

### `Facet(...values: { [key: string]: PipeLineStage[] }[])`
#### Helper: `Field`
```typescript
// const builder = new PipelineBuilder('example');
builder.Facet(
  Field('pipeline1', [{ $match: { tag: 'first' }}]),
  Field('pipeline2', [{ $match: { tag: 'second' }}]),
  Field('pipeline3', [{ $match: { tag: 'third' }}]),
).getPipeline();
// pipeline
[
  {
    '$facet': {
      pipeline1: [ { '$match': { tag: 'first' } } ],
      pipeline2: [ { '$match': { tag: 'second' } } ],
      pipeline3: [ { '$match': { tag: 'third' } } ]
    }
  }
]
// For use with the GetResult method
```

### `GeoNear(value: GeoNearStage)`
#### Helper: `GeoNearHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.GeoNear(
  GeoNearHelper({ type: "Point", coordinates: [ -73.99279 , 40.719296 ] }, 'dist.calculated')
).getPipeline();
// pipeline
[
  {
    '$geoNear': {
      near: { type: 'Point', coordinates: [ -73.99279, 40.719296 ] },
      distanceField: 'dist.calculated'
    }
  }
]
// For use with the GetResult method
```

### `GraphLookup(value: GraphLookupStage)`
```typescript
// const builder = new PipelineBuilder('example');
builder.GraphLookup({
  from: 'employees', startWith: '$reportsTo', connectFromField: 'reportsTo', connectToField: 'name', as: 'reportingHierarchy',
}).getPipeline();
// pipeline
[
  {
    '$graphLookup': {
      from: 'employees',
      startWith: '$reportsTo',
      connectFromField: 'reportsTo',
      connectToField: 'name',
      as: 'reportingHierarchy'
    }
  }
]
// For use with the GetResult method
```

### `Group(value: GroupStage)`
```typescript
// const builder = new PipelineBuilder('example');
builder.Group({ _id: null, count: { $count: { } } }).getPipeline();
// pipeline
[
  { '$group': { _id: null, count: { '$count': {} } } }
]
// For use with the GetResult method
```

### `IndexStats(value: any)`
```typescript
// const builder = new PipelineBuilder('example');
builder.IndexStats({}).getPipeline();
// pipeline
[ { '$indexStats': {} } ]
// For use with the GetResult method
```

### `Limit(value: number)`
```typescript
// const builder = new PipelineBuilder('example');
builder.Limit(10).getPipeline();
// pipeline
[ { '$limit': 10 } ]
// For use with the GetResult method
```

### `ListSessions(value: any)`
```typescript
// const builder = new PipelineBuilder('example');
builder.ListSessions({ allUsers: true }).getPipeline();
// pipeline
[ { '$listSessions': { allUsers: true } } ]
// For use with the GetResult method
```

### `Lookup(value: LookupStage)`
#### Helper: `LookupConditionHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.Lookup(LookupConditionHelper('users', 'users', {
  pipeline: builder2.Match(
    $Expression($GreaterThanEqual('$age', '$$age_min')),
  ).getPipeline(),
  project: ProjectOnlyHelper('name', 'age', 'city'),
  sourceList: ['age_min'],
})).getPipeline();
// pipeline
[
  {
    '$lookup': {
      from: 'users',
      as: 'users',
      let: { age_min: '$age_min' },
      pipeline: [
        {
          '$match': { '$expr': { '$gte': [ '$age', '$$age_min' ] } }
        },
        { '$project': { _id: 0, name: 1, age: 1, city: 1 } }
      ]
    }
  }
]
// For use with the GetResult method
```
#### Helper: `LookupEqualityHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.Lookup(
  LookupEqualityHelper('users', 'user', 'id', 'userId')
).getPipeline();
// pipeline
[
  {
    '$lookup': {
      from: 'users',
      localField: 'id',
      foreignField: 'userId',
      as: 'user'
    }
  }
]
// For use with the GetResult method
```

### `Match(value: any)`
#### Helper: `Field`
```typescript
// const builder = new PipelineBuilder('example');
builder.Match(Field('id', 'fake-id')).getPipeline();
// pipeline
[ { '$match': { id: 'fake-id' } } ]
// For use with the GetResult method
```
#### Operator: `$Expression`
```typescript
// const builder = new PipelineBuilder('example');
builder.Match($Expression($GreaterThanEqual('$age', 18))).getPipeline();
// pipeline
[
  {
    '$match': { '$expr': { '$gte': [ '$age', 18 ] } }
  }
]
// For use with the GetResult method
```

### `Merge(value: MergeStage)`
#### Helper: `MergeIntoHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.Merge(MergeIntoHelper('newCollection')).getPipeline();
// pipeline
[
  {
    '$merge': {
      into: 'newCollection',
      on: '_id',
      whenMatched: 'merge',
      whenNotMatched: 'insert',
      let: { new: '$$ROOT' }
    }
  }
]
// For use with the GetResult method
```

### `Out(value: OutStage)`
#### Helper: `OutDbCollHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.Out(OutDbCollHelper('users', 'db1')).getPipeline();
// pipeline
[ { '$out': { db: 'db1', coll: 'users' } } ]
// For use with the GetResult method
```

### `PlanCacheStats(value: any)`
```typescript
// const builder = new PipelineBuilder('example');
builder.PlanCacheStats({}).getPipeline();
// pipeline
[ { '$planCacheStats': {} } ]
// For use with the GetResult method
```

### `Project(value: { [key: string]: any })`
#### Helper: `ProjectIgnoreHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.Project(ProjectIgnoreHelper('password', 'refreshToken')).getPipeline();
// pipeline
[ { '$project': { password: 0, refreshToken: 0 } } ]
// For use with the GetResult method
```
#### Helper: `ProjectOnlyHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.Project(ProjectOnlyHelper('password', 'refreshToken')).getPipeline();
// pipeline
[ { '$project': { _id: 0, password: 1, refreshToken: 1 } } ]
// For use with the GetResult method
```

### `Redact(value: any)`
```typescript
// const builder = new PipelineBuilder('example');
builder.Redact(
  $Cond(
    $GreaterThan($Size($SetIntersection('$tags', ['STLW', 'G'])), 0),
    '$$DESCEND',
    '$$PRUNE'
  )
).getPipeline();
// pipeline
[
  {
    '$redact': {
      '$cond': [
        { '$gt': [ { '$size': { '$setIntersection': [ '$tags', [ 'STLW', 'G' ] ] } }, 0 ] },
        '$$DESCEND',
        '$$PRUNE'
      ]
    }
  }
]
// For use with the GetResult method
```

### `ReplaceRoot(value: ReplaceRootStage)`
```typescript
// const builder = new PipelineBuilder('example');
builder.ReplaceRoot({
  newRoot: { full_name: { $concat : [ "$first_name", " ", "$last_name" ] } }
}).getPipeline();
// pipeline
[
  {
    '$replaceRoot': {
      newRoot: {
        full_name: { '$concat': [ '$first_name', ' ', '$last_name' ] }
      }
    }
  }
]
// For use with the GetResult method
```

### `ReplaceWith(value: any)`
```typescript
// const builder = new PipelineBuilder('example');
builder.ReplaceWith('$name').getPipeline();
// pipeline
[ { '$replaceWith': '$name' } ]
// For use with the GetResult method
```

### `Sample(value: number)`
```typescript
// const builder = new PipelineBuilder('example');
builder.Sample(6).getPipeline();
// pipeline
[ { '$sample': { size: 6 } } ]
// For use with the GetResult method
```

### `Search(value: AtlasSearchStage)`
#### Helper: `AtlasSearchHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.Search(AtlasSearchHelper('near', {
  'path': 'released',
  'origin': '2011-09-01T00:00:00.000+00:00',
  'pivot': 7776000000,
}, { returnStoredSource: true, scoreDetails: true })).getPipeline();
// pipeline
[
  {
    '$search': {
      near: {
        path: 'released',
        origin: '2011-09-01T00:00:00.000+00:00',
        pivot: 7776000000
      },
      returnStoredSource: true,
      scoreDetails: true
    }
  }
]
// For use with the GetResult method
```

### `Set(...values: { [key: string]: any }[])`
#### Helper: `Field`
```typescript
// const builder = new PipelineBuilder('example');
builder.Set(Field('first', true), Field('second', 2)).getPipeline();
// pipeline
[ { '$set': { first: true, second: 2 } } ]
// For use with the GetResult method
```

### `Skip(value: number)`
```typescript
// const builder = new PipelineBuilder('example');
builder.Skip(100).getPipeline();
// pipeline
[ { '$skip': 100 } ]
// For use with the GetResult method
```

### `Sort(...values: { [key: string]: any }[])`
#### Helper: `Field`
```typescript
// const builder = new PipelineBuilder('example');
builder.Sort(
  Field('first', -1),
  Field('second', 1),
  Field('third', { $meta: "textScore" }),
).getPipeline();
// pipeline
[
  {
    '$sort': { first: -1, second: 1, third: { '$meta': 'textScore' } }
  }
]
// For use with the GetResult method
```

### `SortByCount(value: any)`
```typescript
// const builder = new PipelineBuilder('example');
builder.SortByCount('$employee').getPipeline();
// pipeline
[ { '$sortByCount': '$employee' } ]
// For use with the GetResult method
```

### `UnionWith(value: UnionWithStage)`
#### Helper: `UnionWithCollectionHelper`
```typescript
// const builder = new PipelineBuilder('example');
builder.UnionWith(
  UnionWithCollectionHelper(
    'cities',
    builder2.Project(ProjectOnlyHelper('name', 'country')).getPipeline()
  )
).getPipeline();
// pipeline
[
  {
    '$unionWith': {
      coll: 'cities',
      pipeline: [ { '$project': { _id: 0, name: 1, country: 1 } } ]
    }
  }
]
// For use with the GetResult method
```

### `Unset(...values: string[])`
```typescript
// const builder = new PipelineBuilder('example');
builder.Unset('users', 'roles').getPipeline();
// pipeline
[ { '$unset': [ 'users', 'roles' ] } ]
// For use with the GetResult method
```

### `Unwind(value: string | UnwindStage)`
```typescript
// const builder = new PipelineBuilder('example');
builder.Unwind({ path: '$sizes', preserveNullAndEmptyArrays: true }).getPipeline();
// pipeline
[ { '$unwind': { path: '$sizes', preserveNullAndEmptyArrays: true } } ]
// For use with the GetResult method
```

___
<div style="text-align: center; width: 100%;">

[=> Aggregation Pipeline Operators <=](https://docs.mongodb.com/manual/reference/operator/aggregation/)

</div>
<p style="font-size: 15px;">
$Absolute | $Accumulator | $Acos | $Acosh | $Add | $AddToSet | $AllElementsTrue | $And | $AnyElementTrue | $ArrayElemAt | $ArrayToObject | $Asin | $Asinh | $Atan | $Atan2 | $Atanh | $Avg | $BinarySize | $BsonSize | $Ceil | $Compare | $Concat | $ConcatArrays | $Cond | $Convert | $Cos | $Cosh | $DateFromParts | $DateFromString | $DateToParts | $DateToString | $DayOfMonth | $DayOfWeek | $DayOfYear | $DegreesToRadians | $Divide | $Equal | $Exponent | $Expression | $Filter | $First | $Floor | $FunctionOperator | $GreaterThan | $GreaterThanEqual | $Hour | $IfNull | $In | $IndexOfArray | $IndexOfBytes | $IndexOfCP | $IsArray | $IsNumber | $IsoDayOfWeek | $IsoWeek | $IsoWeekYear | $Last | $LessThan | $LessThanEqual | $Let | $Literal | $Log | $Log10 | $Ltrim | $Map | $Max | $MergeObjects | $Meta | $Millisecond | $Min | $Minute | $Mod | $Month | $Multiply | $NaturalLog | $Not | $NotEqual | $ObjectToArray | $Or | $Pow | $Push | $RadiansToDegrees | $Rand | $Range | $Reduce | $RegexFind | $RegexFindAll | $RegexMatch | $ReplaceAll | $ReplaceOne | $ReverseArray | $Round | $Rtrim | $SampleRate | $Second | $SetDifference | $SetEquals | $SetIntersection | $SetIsSubset | $SetUnion | $Sin | $Sinh | $Size | $Slice | $Split | $Sqrt | $StdDevPop | $StdDevSamp | $StrCaseCmp | $StrLenBytes | $StrLenCP | $Substr | $SubstrBytes | $SubstrCP | $Subtract | $Sum | $Switch | $Tan | $Tanh | $ToBool | $ToDate | $ToDecimal | $ToDouble | $ToInt | $ToLong | $ToLower | $ToObjectId | $ToString | $ToUpper | $Trim | $Trunc | $Type | $Week | $Year | $Zip
</p>
