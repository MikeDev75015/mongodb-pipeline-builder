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
- Pipeline stages appear in an array. 
- Sequential stages for documents

All stages except the Out, Merge, GeoNear, ChangeStream, ChangeStreamSplitLargeEvent and Paging stages can appear multiple times in a pipeline.

</p>

---

## npm package <img src="https://pbs.twimg.com/media/EDoWJbUXYAArclg.png" width="24" height="24" />

`npm i -S mongodb-pipeline-builder`


---


> **Breaking changes** between **v3** and **v4**

-  **Helpers**
 
   > Replacing the `Payload` suffix with `Helper` suffix
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
    .build();
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
    .Lookup( LookupEqualityHelper( 'profiles', 'profile', 'id', 'profileId' ) )
    .Project( ProjectOnlyHelper( 'firstname', 'lastname', 'email' ) )
    .AddFields(
        Field( 'skills', $ArrayElemAt( '$profile.skills', 0 ) ),
        Field( 'availability', $ArrayElemAt( '$profile.availability', 0 ) )
    )
    .Unset( 'profile' )
    .build();
```

*is equivalent to*

```typescript
const myNewPipeline = [
    { $match: { $expr: { $eq: ["$id", 123456] } } },
    { $lookup: { from: "profiles", as: "profile", localField: "id", foreignField: "profileId" } },
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
result.GetElement(2); // will return document to index 2, document3
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

---

`// builder = new PipelineBuilder('example');`

## PAGING STAGE
#### For use with the GetPagingResult method

### Paging(elementsPerPage: number, page = 1)

  *The Paging stage automatically adds 3 native stages used to paginate documents ($skip, $limit and $count).*

```typescript
builder.Paging(5, 2).build();

// pipeline
[
  {
    '$facet': {
      docs: [ { '$skip': 5 }, { '$limit': 5 } ],
      count: [ { '$count': 'totalElements' } ]
    }
  }
]
```


## [MONGODB STAGES](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)
#### For use with the GetResult method

### [AddFields](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/)(...values: AddFieldsStage[])
#### Helper: `Field`
```typescript
builder.AddFields(Field('foo', 'value1'), Field('bar', 'value2')).build();

// pipeline
[ { '$addFields': { foo: 'value1', bar: 'value2' } } ]
```

### [Bucket](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/)(value: BucketStage)
#### Helper: `BucketGroupByHelper`
```typescript
builder.Bucket(BucketGroupByHelper('$age', [6, 13, 18])).build();

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
```

### [BucketAuto](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucketAuto/)(value: BucketAutoStage)
#### Helper: `BucketAutoGroupByHelper`
```typescript
builder.BucketAuto(BucketAutoGroupByHelper('$age', 5)).build();

// pipeline
[
  {
    '$bucketAuto': { groupBy: '$age', buckets: 5, output: { count: { '$sum': 1 } } }
  }
]
```

### [ChangeStream](https://www.mongodb.com/docs/manual/reference/operator/aggregation/changeStream/)(value: ChangeStreamStage)
```typescript
builder.ChangeStream({ allChangesForCluster: true, fullDocument: 'required' }).build();

// pipeline
[
  {
    '$changeStream': { allChangesForCluster: true, fullDocument: 'required' }
  }
]
```

### [ChangeStreamSplitLargeEvent](https://www.mongodb.com/docs/manual/reference/operator/aggregation/changeStreamSplitLargeEvent/)(value: ChangeStreamSplitLargeEventStage)
```typescript
builder.ChangeStreamSplitLargeEvent({}).build();

// pipeline
[ { '$changeStreamSplitLargeEvent': {} } ]
```

### [CollStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/collStats/)(value: CollStatsStage)
```typescript
builder.CollStats({ latencyStats: { histograms: true } }).build();

// pipeline
[
  { '$collStats': { latencyStats: { histograms: true } } }
]
```

### [Count](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/)(value: string)
```typescript
builder.Count('counter').build();

// pipeline
[ { '$count': 'counter' } ]
```

### [CurrentOp](https://www.mongodb.com/docs/manual/reference/operator/aggregation/currentOp/)(value: CurrentOpStage)
#### Helper: `CurrentOpHelper`
```typescript
builder.CurrentOp(CurrentOpHelper({ allUsers: true, idleConnections: true })).build();

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
```

### [Densify](https://www.mongodb.com/docs/manual/reference/operator/aggregation/densify/)(value: DensifyStage)
```typescript
builder.Densify({
  field: "altitude",
  partitionByFields: [ "variety" ],
  range: { bounds: "full", step: 200 }
}).build();

// pipeline
[
  {
    '$densify': {
      field: 'altitude',
      partitionByFields: [ 'variety' ],
      range: { bounds: 'full', step: 200 }
    }
  }
]
```

### [Documents](https://www.mongodb.com/docs/manual/reference/operator/aggregation/documents/)(value: DocumentsStage)
```typescript
builder.Documents([{ doc1Id: 1 }, { doc2Id: 2 }, { doc3Id: 3 }]).build();

// pipeline
[
  { '$documents': [ { doc1Id: 1 }, { doc2Id: 2 }, { doc3Id: 3 } ] }
]
```

### [Facet](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/)(...values: FacetStage[])
#### Helper: `Field`
```typescript
builder.Facet(
  Field('pipeline1', [{ $match: { tag: 'first' }}]),
  Field('pipeline2', [{ $match: { tag: 'second' }}]),
  Field('pipeline3', [{ $match: { tag: 'third' }}]),
).build();

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
```

### [Fill](https://www.mongodb.com/docs/manual/reference/operator/aggregation/fill/)(value: FillStage)
```typescript
builder.Fill({
  output:
    {
      "bootsSold": { value: 0 },
      "sandalsSold": { value: 0 },
      "sneakersSold": { value: 0 }
    }
}).build();

// pipeline
[
  {
    '$fill': {
      output: {
        bootsSold: { value: 0 },
        sandalsSold: { value: 0 },
        sneakersSold: { value: 0 }
      }
    }
  }
]
```

### [GeoNear](https://www.mongodb.com/docs/manual/reference/operator/aggregation/geoNear/)(value: GeoNearStage)
#### Helper: `GeoNearHelper`
```typescript
builder.GeoNear(
  GeoNearHelper({ type: "Point", coordinates: [ -73.99279 , 40.719296 ] }, 'dist.calculated')
).build();

// pipeline
[
  {
    '$geoNear': {
      near: { type: 'Point', coordinates: [ -73.99279, 40.719296 ] },
      distanceField: 'dist.calculated'
    }
  }
]
```

### [GraphLookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/)(value: GraphLookupStage)
```typescript
builder.GraphLookup({
  from: 'employees', startWith: '$reportsTo', connectFromField: 'reportsTo', connectToField: 'name', as: 'reportingHierarchy',
}).build();

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
```

### [Group](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)(value: GroupStage)
```typescript
builder.Group({ _id: null, count: { $count: { } } }).build();

// pipeline
[
  { '$group': { _id: null, count: { '$count': {} } } }
]
```

### [IndexStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexStats/)(value: IndexStatsStage)
```typescript
builder.IndexStats({}).build();

// pipeline
[ { '$indexStats': {} } ]
```

### [Limit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/)(value: number)
```typescript
builder.Limit(10).build();

// pipeline
[ { '$limit': 10 } ]
```

### [ListLocalSessions](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listLocalSessions/)(value: ListSessionsStage)
```typescript
builder.ListLocalSessions({ allUsers: true }).build();

// pipeline
[ { '$listLocalSessions': { allUsers: true } } ]
```

### [ListSampledQueries](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSampledQueries/)(value: ListSampledQueriesStage)
```typescript
builder.ListSampledQueries({ namespace: "social.post" }).build();

// pipeline
[ { '$listSampledQueries': { namespace: 'social.post' } } ]
```

### [ListSearchIndexes](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSearchIndexes/)(value: ListSearchIndexesStage)
```typescript
builder.ListSearchIndexes({ name: 'searchIndex01' }).build();

// pipeline
[ { '$listSearchIndexes': { name: 'searchIndex01' } } ]
```

### [ListSessions](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSessions/)(value: ListSessionsStage)
```typescript
builder.ListSessions({ allUsers: true }).build();

// pipeline
[ { '$listSessions': { allUsers: true } } ]
```

### [Lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)(value: LookupStage)
#### Helper: `LookupConditionHelper`
```typescript
builder.Lookup(LookupConditionHelper('users', 'users', {
  pipeline: builder2.Match(
    $Expression($GreaterThanEqual('$age', '$$age_min')),
  ).build(),
  project: ProjectOnlyHelper('name', 'age', 'city'),
  sourceList: ['age_min'],
})).build();

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
```
#### Helper: `LookupEqualityHelper`
```typescript
builder.Lookup(
  LookupEqualityHelper('users', 'user', 'id', 'userId')
).build();

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
```

### [Match](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)(value: MatchStage)
#### Helper: `Field`
```typescript
builder.Match(Field('age', 18)).build();

// pipeline
[ { '$match': { age: 18 } } ]
```
#### Operator: `$Expression`
```typescript
builder.Match($Expression($GreaterThanEqual('$age', 18))).build();

// pipeline
[
  {
    '$match': { '$expr': { '$gte': [ '$age', 18 ] } }
  }
]
```

### [Merge](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/)(value: MergeStage)
#### Helper: `MergeIntoHelper`
```typescript
builder.Merge(MergeIntoHelper('newCollection')).build();

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
```

### [Out](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/)(value: OutStage)
#### Helper: `OutDbCollHelper`
```typescript
builder.Out(OutDbCollHelper('users', 'db1')).build();

// pipeline
[ { '$out': { db: 'db1', coll: 'users' } } ]
```

### [PlanCacheStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/planCacheStats/)(value: PlanCacheStatsStage)
```typescript
builder.PlanCacheStats({}).build();

// pipeline
[ { '$planCacheStats': {} } ]
```

### [Project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)(value: ProjectStage)
#### Helper: `ProjectIgnoreHelper`
```typescript
builder.Project(ProjectIgnoreHelper('password', 'refreshToken')).build();

// pipeline
[ { '$project': { password: 0, refreshToken: 0 } } ]
```
#### Helper: `ProjectOnlyHelper`
```typescript
builder.Project(ProjectOnlyHelper('password', 'refreshToken')).build();

// pipeline
[ { '$project': { _id: 0, password: 1, refreshToken: 1 } } ]
```

### [Redact](https://www.mongodb.com/docs/manual/reference/operator/aggregation/redact/)(value: RedactStage)
```typescript
builder.Redact(
  $Cond(
    $GreaterThan($Size($SetIntersection('$tags', ['STLW', 'G'])), 0),
    '$$DESCEND',
    '$$PRUNE'
  )
).build();

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
```

### [ReplaceRoot](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/)(value: ReplaceRootStage)
```typescript
builder.ReplaceRoot({
  newRoot: { full_name: { $concat : [ "$first_name", " ", "$last_name" ] } }
}).build();

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
```

### [ReplaceWith](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceWith/)(value: ReplaceWithStage)
```typescript
builder.ReplaceWith('$name').build();

// pipeline
[ { '$replaceWith': '$name' } ]
```

### [Sample](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/)(value: number)
```typescript
builder.Sample(6).build();

// pipeline
[ { '$sample': { size: 6 } } ]
```

### [Search](https://www.mongodb.com/docs/manual/reference/operator/aggregation/search/)(value: AtlasSearchStage)
#### Helper: `SearchHelper`
```typescript
builder.Search(SearchHelper('near', {
  'path': 'released',
  'origin': '2011-09-01T00:00:00.000+00:00',
  'pivot': 7776000000,
}, { returnStoredSource: true, scoreDetails: true })).build();

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
```

### [SearchMeta](https://www.mongodb.com/docs/manual/reference/operator/aggregation/searchMeta/)(value: AtlasSearchStage)
#### Helper: `SearchHelper`
```typescript
builder.SearchMeta(SearchHelper('range', {
  "path": "year",
  "gte": 1998,
  "lt": 1999
}, { count: { type: 'total' } })).build();

// pipeline
[
  {
    '$searchMeta': {
      range: { path: 'year', gte: 1998, lt: 1999 },
      count: { type: 'total' }
    }
  }
]
```

### [Set](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/)(...values: SetStage[])
#### Helper: `Field`
```typescript
builder.Set(Field('first', true), Field('second', 2)).build();

// pipeline
[ { '$set': { first: true, second: 2 } } ]
```

### [SetWindowFields](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/)(value: SetWindowFieldsStage)
```typescript
builder.SetWindowFields({
  partitionBy: "$state",
  sortBy: { orderDate: 1 },
  output: {
    cumulativeQuantityForState: {
      $sum: "$quantity",
      window: { documents: [ "unbounded", "current" ] }
    }
  }
}).build();

// pipeline
[
  {
    '$setWindowFields': {
      partitionBy: '$state',
      sortBy: { orderDate: 1 },
      output: {
        cumulativeQuantityForState: {
          '$sum': '$quantity',
          window: { documents: [ 'unbounded', 'current' ] }
        }
      }
    }
  }
]
```

### [ShardedDataDistribution](https://www.mongodb.com/docs/manual/reference/operator/aggregation/shardedDataDistribution/)(value: ShardedDataDistributionStage)
```typescript
builder.ShardedDataDistribution({}).build();

// pipeline
[ { '$shardedDataDistribution': {} } ]
```

### [Skip](https://www.mongodb.com/docs/manual/reference/operator/aggregation/skip/)(value: number)
```typescript
builder.Skip(100).build();

// pipeline
[ { '$skip': 100 } ]
```

### [Sort](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/)(...values: SortStage[])
#### Helper: `Field`
```typescript
builder.Sort(
  Field('first', -1),
  Field('second', 1),
  Field('third', { $meta: "textScore" }),
).build();

// pipeline
[
  {
    '$sort': { first: -1, second: 1, third: { '$meta': 'textScore' } }
  }
]
```

### [SortByCount](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortByCount/)(value: SortByCountStage)
```typescript
builder.SortByCount('$employee').build();
// pipeline

[ { '$sortByCount': '$employee' } ]
```

### [UnionWith](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unionWith/)(value: UnionWithStage)
#### Helper: `UnionWithCollectionHelper`
```typescript
builder.UnionWith(
  UnionWithCollectionHelper(
    'cities',
    builder2.Project(ProjectOnlyHelper('name', 'country')).build()
  )
).build();

// pipeline
[
  {
    '$unionWith': {
      coll: 'cities',
      pipeline: [ { '$project': { _id: 0, name: 1, country: 1 } } ]
    }
  }
]
```

### [Unset](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/)(...values: UnsetStage)
```typescript
builder.Unset('users', 'roles').build();

// pipeline
[ { '$unset': [ 'users', 'roles' ] } ]
```

### [Unwind](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/)(value: UnwindStage)
```typescript
builder.Unwind({ path: '$sizes', preserveNullAndEmptyArrays: true }).build();

// pipeline
[ { '$unwind': { path: '$sizes', preserveNullAndEmptyArrays: true } } ]
```

___
<div style="text-align: center; width: 100%;">

[=> Aggregation Pipeline Operators <=](https://docs.mongodb.com/manual/reference/operator/aggregation/)

</div>
<p style="font-size: 15px;">
$Absolute | $Accumulator | $Acos | $Acosh | $Add | $AddToSet | $AllElementsTrue | $And | $AnyElementTrue | $ArrayElemAt | $ArrayToObject | $Asin | $Asinh | $Atan | $Atan2 | $Atanh | $Avg | $BinarySize | $BsonSize | $Ceil | $Compare | $Concat | $ConcatArrays | $Cond | $Convert | $Cos | $Cosh | $DateFromParts | $DateFromString | $DateToParts | $DateToString | $DayOfMonth | $DayOfWeek | $DayOfYear | $DegreesToRadians | $Divide | $Equal | $Exponent | $Expression | $Filter | $First | $Floor | $FunctionOperator | $GreaterThan | $GreaterThanEqual | $Hour | $IfNull | $In | $IndexOfArray | $IndexOfBytes | $IndexOfCP | $IsArray | $IsNumber | $IsoDayOfWeek | $IsoWeek | $IsoWeekYear | $Last | $LessThan | $LessThanEqual | $Let | $Literal | $Log | $Log10 | $Ltrim | $Map | $Max | $MergeObjects | $Meta | $Millisecond | $Min | $Minute | $Mod | $Month | $Multiply | $NaturalLog | $Not | $NotEqual | $ObjectToArray | $Or | $Pow | $Push | $RadiansToDegrees | $Rand | $Range | $Reduce | $RegexFind | $RegexFindAll | $RegexMatch | $ReplaceAll | $ReplaceOne | $ReverseArray | $Round | $Rtrim | $SampleRate | $Second | $SetDifference | $SetEquals | $SetIntersection | $SetIsSubset | $SetUnion | $Sin | $Sinh | $Size | $Slice | $Split | $Sqrt | $StdDevPop | $StdDevSamp | $StrCaseCmp | $StrLenBytes | $StrLenCP | $Substr | $SubstrBytes | $SubstrCP | $Subtract | $Sum | $Switch | $Tan | $Tanh | $ToBool | $ToDate | $ToDecimal | $ToDouble | $ToInt | $ToLong | $ToLower | $ToObjectId | $ToString | $ToUpper | $Trim | $Trunc | $Type | $Week | $Year | $Zip
</p>
