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
> * Renaming `getPipeline()` with `build()`
> * Added new stages: ChangeStream, ChangeStreamSplitLargeEvent, Densify, Documents, Fill, ListLocalSessions, ListSampledQueries, ListSearchIndexes, SearchMeta, SetWindowFields and ShardedDataDistribution
> * Added the possibility to insert stages without validation
> * Checking for non-duplicable stages

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
  > Added new GetElement method to the response object
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
const { $LessThanEqual, $ArrayElementAt, $Equal, $Expression } = require('mongodb-pipeline-builder/operators');
```

### Using `import`


```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { LookupEqualityHelper, ProjectOnlyHelper, Field } from 'mongodb-pipeline-builder/helpers';
import { $LessThanEqual, $ArrayElementAt, $Equal, $Expression } from 'mongodb-pipeline-builder/operators';
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
        Field( 'skills', $ArrayElementAt( '$profile.skills', 0 ) ),
        Field( 'availability', $ArrayElementAt( '$profile.availability', 0 ) )
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
GetResult<T>(): Promise<GetResultResponse<T>>
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
GetPagingResult<T>(): Promise<GetPagingResultResponse<T>>
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

## CUSTOM STAGES

### Paging(elementsPerPage, page)

  *The Paging stage automatically adds 3 native stages used to paginate documents ($skip, $limit and $count).
  <br>Page is optional and defaults to 1.*

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

### InsertStage(stage)

  *The InsertStage stage allows you to insert a stage without validation.
  <br>Usefully when you need to insert a stage that is not yet implemented
  or when the value fails validation but for some reason you want to keep it.*

```typescript
builder.InsertStage({ '$myCustomStage': { myField: 'myValue' } }).build();

// pipeline
[ { '$myCustomStage': { myField: 'myValue' } } ]
```


## [MONGODB STAGES](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)

### [AddFields](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/)(...values)
#### Helper: `Field(name, value)`
```typescript
builder.AddFields(
  Field('foo', 'value1'),
  Field('bar', 'value2'),
).build();

// pipeline
[ { $addFields: { foo: 'value1', bar: 'value2' } } ]
```

### [Bucket](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/)(value)
#### Helper: `BucketHelper(groupBy, boundaries, optional)`
```typescript
builder.Bucket(BucketHelper('$age', [6, 13, 18])).build();

// pipeline
[ { $bucket: { groupBy: '$age', boundaries: [ 6, 13, 18 ] } } ]
```

### [BucketAuto](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucketAuto/)(value)
#### Helper: `BucketAutoHelper(groupBy, buckets, optional)`
```typescript
builder.BucketAuto(BucketAutoHelper('$age', 5)).build();

// pipeline
[ { $bucketAuto: { groupBy: '$age', buckets: 5 } } ]
```

### [ChangeStream](https://www.mongodb.com/docs/manual/reference/operator/aggregation/changeStream/)(value)
#### Helper: `ChangeStreamHelper(optional)`
```typescript
builder.ChangeStream(ChangeStreamHelper()).build();

// pipeline
[ { $changeStream: {} } ]
```

### [ChangeStreamSplitLargeEvent](https://www.mongodb.com/docs/manual/reference/operator/aggregation/changeStreamSplitLargeEvent/)()
```typescript
builder.ChangeStreamSplitLargeEvent().build();

// pipeline
[ { $changeStreamSplitLargeEvent: {} } ]
```

### [CollStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/collStats/)(value)
#### Helper: `CollStatsHelper(optional)`
```typescript
builder.CollStats(CollStatsHelper()).build();

// pipeline
[ { $collStats: {} } ]
```

### [Count](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/)(value)
```typescript
builder.Count('counter').build();

// pipeline
[ { $count: 'counter' } ]
```

### [CurrentOp](https://www.mongodb.com/docs/manual/reference/operator/aggregation/currentOp/)(value)
#### Helper: `CurrentOpHelper(optional)`
```typescript
builder.CurrentOp(CurrentOpHelper()).build();

// pipeline
[ { $currentOp: {} } ]
```

### [Densify](https://www.mongodb.com/docs/manual/reference/operator/aggregation/densify/)(value, optional)
#### Helper: `DensifyHelper(field, range, optional)`
```typescript
builder.Densify(
    DensifyHelper(
      'altitude',
      { bounds: 'full', step: 200 },
      { partitionByFields: [ 'variety' ] }
    ),
).build();

// pipeline
[
  {
    $densify: {
      field: 'altitude',
      range: { bounds: 'full', step: 200 }
      partitionByFields: [ 'variety' ],
    }
  }
]
```

### [Documents](https://www.mongodb.com/docs/manual/reference/operator/aggregation/documents/)(...values)
```typescript
builder.Documents({ doc1Id: 1 }, { doc2Id: 2 }, { doc3Id: 3 }).build();

// pipeline
[ { $documents: [ { doc1Id: 1 }, { doc2Id: 2 }, { doc3Id: 3 } ] } ]
```

### [Facet](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/)(...values)
#### Helper: `Field(name, pipeline)`
```typescript
builder.Facet(
  Field('pipeline1', [{ $match: { tag: 'first' }}]),
  Field('pipeline2', [{ $match: { tag: 'second' }}]),
  Field('pipeline3', [{ $match: { tag: 'third' }}]),
).build();

// pipeline
[
  {
    $facet: {
      pipeline1: [ { '$match': { tag: 'first' } } ],
      pipeline2: [ { '$match': { tag: 'second' } } ],
      pipeline3: [ { '$match': { tag: 'third' } } ]
    }
  }
]
```

### [Fill](https://www.mongodb.com/docs/manual/reference/operator/aggregation/fill/)(value)
#### Helper: `FillHelper(output, optional)`
```typescript
builder.Fill(
  FillHelper({
    bootsSold: { value: 0 },
    sandalsSold: { value: 0 },
    sneakersSold: { value: 0 },
  }),
).build();

// pipeline
[
  {
    $fill: {
      output: {
        bootsSold: { value: 0 },
        sandalsSold: { value: 0 },
        sneakersSold: { value: 0 }
      }
    }
  }
]
```

### [GeoNear](https://www.mongodb.com/docs/manual/reference/operator/aggregation/geoNear/)(value)
#### Helper: `GeoNearHelper(near, distanceField, optional)`
```typescript
builder.GeoNear(
  GeoNearHelper({ type: "Point", coordinates: [ -73.99279 , 40.719296 ] }, 'calculated')
).build();

// pipeline
[
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [ -73.99279, 40.719296 ] },
      distanceField: 'calculated'
    }
  }
]
```

### [GraphLookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/)(value)
```typescript
builder.GraphLookup({
  from: 'employees', startWith: '$reportsTo', connectFromField: 'reportsTo', connectToField: 'name', as: 'reportingHierarchy',
}).build();

// pipeline
[
  {
    $graphLookup: {
      from: 'employees',
      startWith: '$reportsTo',
      connectFromField: 'reportsTo',
      connectToField: 'name',
      as: 'reportingHierarchy'
    }
  }
]
```

### [Group](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)(value)
```typescript
builder.Group({ _id: null, count: { $count: { } } }).build();

// pipeline
[
  { $group: { _id: null, count: { '$count': {} } } }
]
```

### [IndexStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexStats/)()
```typescript
builder.IndexStats().build();

// pipeline
[ { $indexStats: {} } ]
```

### [Limit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/)(value)
```typescript
builder.Limit(10).build();

// pipeline
[ { $limit: 10 } ]
```

### [ListLocalSessions](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listLocalSessions/)(value)
```typescript
builder.ListLocalSessions({ allUsers: true }).build();

// pipeline
[ { $listLocalSessions: { allUsers: true } } ]
```

### [ListSampledQueries](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSampledQueries/)(value)
```typescript
builder.ListSampledQueries({ namespace: "social.post" }).build();

// pipeline
[ { $listSampledQueries: { namespace: 'social.post' } } ]
```

### [ListSearchIndexes](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSearchIndexes/)(value)
```typescript
builder.ListSearchIndexes({ name: 'searchIndex01' }).build();

// pipeline
[ { $listSearchIndexes: { name: 'searchIndex01' } } ]
```

### [ListSessions](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSessions/)(value)
```typescript
builder.ListSessions({ allUsers: true }).build();

// pipeline
[ { $listSessions: { allUsers: true } } ]
```

### [Lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)(value)
#### Helper: `LookupConditionHelper(from, as, optional)`
```typescript
builder.Lookup(LookupConditionHelper('users', 'users')).build();

// pipeline
[ { $lookup: { from: 'users', as: 'users' } } ]
```
#### Helper: `LookupEqualityHelper(from, as, localField, foreignField)`
```typescript
builder.Lookup(
  LookupEqualityHelper('users', 'users', 'userId', 'id')
).build();

// pipeline
[
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: 'id',
      as: 'users'
    }
  }
]
```

### [Match](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)(value)
#### Helper: `Field(name, value)`
```typescript
builder.Match(Field('age', 18)).build();

// pipeline
[ { $match: { age: 18 } } ]
```
#### Operator: `$Expression`
```typescript
builder.Match($Expression($GreaterThanEqual('$age', 18))).build();

// pipeline
[ { $match: { '$expr': { '$gte': [ '$age', 18 ] } } } ]
```

### [Merge](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/)(value)
#### Helper: `MergeHelper(into, optional)`
```typescript
builder.Merge(MergeHelper('newCollection')).build();

// pipeline
[ { $merge: { into: 'newCollection' } } ]
```

### [Out](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/)(value)
#### Helper: `OutHelper(collection, optional)`
```typescript
builder.Out(OutHelper('users')).build();

// pipeline
[ { $out: 'users' } ]
```

### [PlanCacheStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/planCacheStats/)()
```typescript
builder.PlanCacheStats().build();

// pipeline
[ { $planCacheStats: {} } ]
```

### [Project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)(...values)
#### Helper: `ProjectHelper(field, value)`
```typescript
builder.Project(
  ProjectHelper('age', '$user.age'),
  ProjectHelper(
    'nickname',
    {
      $cond: {
        if: { $eq: [ '', '$user.nickname' ] },
        then: '$$REMOVE',
        else: '$user.nickname',
      },
    },
  ),
).build();

// pipeline
[
  {
    $project: {
      age: '$user.age',
      nickname: {
        $cond: {
          if: { $eq: [ '', '$user.nickname' ] },
          then: '$$REMOVE',
          else: '$user.nickname'
        }
      }
    }
  }
]
```
#### Helper: `ProjectIgnoreHelper(...fields)`
```typescript
builder.Project(ProjectIgnoreHelper('password', 'refreshToken')).build();

// pipeline
[ { $project: { password: 0, refreshToken: 0 } } ]
```
#### Helper: `ProjectOnlyHelper(...fields)`
```typescript
builder.Project(ProjectOnlyHelper('password', 'refreshToken')).build();

// pipeline
[ { $project: { _id: 0, password: 1, refreshToken: 1 } } ]
```

### [Redact](https://www.mongodb.com/docs/manual/reference/operator/aggregation/redact/)(value)
```typescript
builder.Redact(
  $Condition(
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

### [ReplaceRoot](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/)(value)
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

### [ReplaceWith](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceWith/)(value)
```typescript
builder.ReplaceWith('$name').build();

// pipeline
[ { '$replaceWith': '$name' } ]
```

### [Sample](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/)(value)
#### Helper: `SampleHelper(size)`
```typescript
builder.Sample(SampleHelper(6)).build();

// pipeline
[ { '$sample': { size: 6 } } ]
```

### [Search](https://www.mongodb.com/docs/manual/reference/operator/aggregation/search/)(value)
#### Helper: `SearchHelper(operator | collector, optional)`
```typescript
builder.Search(
  SearchHelper({
    near: { path: 'released', origin: date, pivot: 7776000000 },
  }),
).build();

// pipeline
[
  {
    '$search': {
      near: { path: 'released', origin: date, pivot: 7776000000 },
    },
  }
]
```

### [SearchMeta](https://www.mongodb.com/docs/manual/reference/operator/aggregation/searchMeta/)(value)
#### Helper: `SearchMetaHelper(collector, optional)`
```typescript
builder.SearchMeta(
  SearchMetaHelper({
    facet: {
      operator: {
        near: { path: 'released', origin: date, pivot: 7776000000 },
      },
      facets: {
        test: { type: 'number', path: 'released', boundaries: [0, 100] },
      },
    },
  })
).build();

// pipeline
[
  {
    '$searchMeta': {
      facet: {
        operator: {
          near: { path: 'released', origin: date, pivot: 7776000000 },
        },
        facets: {
          test: { type: 'number', path: 'released', boundaries: [0, 100] },
        },
      },
    }
  }
]
```

### [Set](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/)(...values)
#### Helper: `Field(name, value)`
```typescript
builder.Set(Field('first', true), Field('second', 2)).build();

// pipeline
[ { '$set': { first: true, second: 2 } } ]
```

### [SetWindowFields](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/)(value)
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

### [ShardedDataDistribution](https://www.mongodb.com/docs/manual/reference/operator/aggregation/shardedDataDistribution/)(value)
```typescript
builder.ShardedDataDistribution({}).build();

// pipeline
[ { '$shardedDataDistribution': {} } ]
```

### [Skip](https://www.mongodb.com/docs/manual/reference/operator/aggregation/skip/)(value)
```typescript
builder.Skip(100).build();

// pipeline
[ { '$skip': 100 } ]
```

### [Sort](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/)(...values)
#### Helper: `Field(name, value)`
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

### [SortByCount](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortByCount/)(value)
```typescript
builder.SortByCount('$employee').build();
// pipeline

[ { '$sortByCount': '$employee' } ]
```

### [UnionWith](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unionWith/)(value)
#### Helper: `UnionWithHelper(collection, pipeline)`
```typescript
builder.UnionWith(
  UnionWithHelper('cars'),
).build();

// pipeline
[
  {
    '$unionWith': { coll: 'cars' }
  }
]
```
```typescript
builder.UnionWith(
  UnionWithHelper(
    undefined,
    [{ $document: [{ ref: 1 }, { ref: 2 }, { ref: 3 }],  }]),
).build();

// pipeline
[
  {
    '$unionWith': { pipeline: [ { '$document': [ { ref: 1 }, { ref: 2 }, { ref: 3 } ] } ] }
  }
]
```
```typescript
builder.UnionWith(
  UnionWithHelper('cars', [{ $match: { color: 'red' } }]),
).build();

// pipeline
[
  {
    '$unionWith': { coll: 'cars', pipeline: [ { '$match': { color: 'red' } } ] }
  }
]
```

### [Unset](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/)(...values)
```typescript
builder.Unset('users', 'roles').build();

// pipeline
[ { '$unset': [ 'users', 'roles' ] } ]
```

### [Unwind](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/)(value)
```typescript
builder.Unwind({ path: '$sizes', preserveNullAndEmptyArrays: true }).build();

// pipeline
[ { '$unwind': { path: '$sizes', preserveNullAndEmptyArrays: true } } ]
```

___


# [MONGODB OPERATORS](https://docs.mongodb.com/manual/reference/operator/aggregation/)

#### [$Absolute](https://www.mongodb.com/docs/manual/reference/operator/aggregation/abs/)
```typescript
$Absolute(-5)

// operator
{ $abs: -5 }
```
#### [$Accumulator](https://www.mongodb.com/docs/manual/reference/operator/aggregation/accumulator/)
```typescript
$Accumulator(
  () => ({ count: 0, sum: 0 }),
  (state: { count: number; sum: number; }, numCopies: number) => ({
    count: state.count + 1,
    sum: state.sum + numCopies,
  }),
  ['$copies'],
  (state1: { count: number; sum: number; }, state2: { count: number; sum: number; }) => ({
    count: state1.count + state2.count,
    sum: state1.sum + state2.sum,
  }),
  { finalize: (state: { sum: number; count: number; }) => (state.sum / state.count) },
)

// operator
{
  '$accumulator': {
    init: [ () => ({ count: 0, sum: 0 }) ],
    accumulate: [
      (state: { count: number; sum: number; }, numCopies: number) => ({
        count: state.count + 1,
        sum: state.sum + numCopies,
      })
    ],
    accumulateArgs: [ '$copies' ],
    merge: [
      (state1: { count: number; sum: number; }, state2: { count: number; sum: number; }) => ({
        count: state1.count + state2.count,
        sum: state1.sum + state2.sum,
      })
    ],
    finalize: [ (state: { sum: number; count: number; }) => (state.sum / state.count) ],
    lang: 'js'
  }
}
```
#### [$ArcCosine](https://www.mongodb.com/docs/manual/reference/operator/aggregation/acos/)
```typescript
$ArcCosine({ $divide : [ '$side_b', '$hypotenuse' ] })

// operator
{ '$acos': { '$divide': [ '$side_b', '$hypotenuse' ] } }
```
#### [$ArcCosineHyperbolic](https://www.mongodb.com/docs/manual/reference/operator/aggregation/acosh/)
```typescript
$ArcCosineHyperbolic(3)

// operator
{ '$acosh': 3 }
```
#### [$Add](https://www.mongodb.com/docs/manual/reference/operator/aggregation/add/)
```typescript
$Add('$price', 10)

// operator
{ '$add': [ '$price', 10 ] }
```
#### [$AddToSet](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addToSet/)
```typescript
$AddToSet('$item')

// operator
{ '$addToSet': '$item' }
```
#### [$AllElementsTrue](https://www.mongodb.com/docs/manual/reference/operator/aggregation/allElementsTrue/)
```typescript
$AllElementsTrue([ true, 1, "someString" ])

// operator
{ '$allElementsTrue': [ [ true, 1, 'someString' ] ] }
```
#### [$And](https://www.mongodb.com/docs/manual/reference/operator/aggregation/and/)
```typescript
$And(1, 'green')

// operator
{ '$and': [ 1, 'green' ] }
```
#### [$AnyElementTrue](https://www.mongodb.com/docs/manual/reference/operator/aggregation/anyElementTrue/)
```typescript
$AnyElementTrue([ true, false ])

// operator
{ '$anyElementTrue': [ [ true, false ] ] }
```
#### [$ArrayElementAt](https://www.mongodb.com/docs/manual/reference/operator/aggregation/arrayElemAt/)
```typescript
$ArrayElementAt([ 1, 2, 3 ], 0)

// operator
{ '$arrayElemAt': [ [ 1, 2, 3 ], 0 ] }
```
#### [$ArrayToObject](https://www.mongodb.com/docs/manual/reference/operator/aggregation/arrayToObject/)
```typescript
$ArrayToObject([ { "k": "item", "v": "abc123" }, { "k": "qty", "v": "$qty" } ])

// operator
{ '$arrayToObject': [ { k: 'item', v: 'abc123' }, { k: 'qty', v: '$qty' } ] }
```
```typescript
$ArrayToObject([ [ "item", "abc123" ], [ "qty", 25 ] ], true)              

// operator
{ '$arrayToObject': { '$literal': [ [ 'item', 'abc123' ], [ 'qty', 25 ] ] } }
```
#### [$ArcSine](https://www.mongodb.com/docs/manual/reference/operator/aggregation/asin/)
```typescript
$ArcSine('$value')

// operator
{ '$asin': '$value' }
```
#### [$ArcSineHyperbolic](https://www.mongodb.com/docs/manual/reference/operator/aggregation/asinh/)
```typescript
$ArcSineHyperbolic('$value')

// operator
{ '$asinh': '$value' }
```
#### [$ArcTangent](https://www.mongodb.com/docs/manual/reference/operator/aggregation/atan/)
```typescript
$ArcTangent('$value')

// operator
{ '$atan': '$value' }
```
#### [$ArcTangent2](https://www.mongodb.com/docs/manual/reference/operator/aggregation/atan2/)
```typescript
$ArcTangent2('$side_b', '$side_a')

// operator
{ '$atan2': [ '$side_b', '$side_a' ] }
```
#### [$ArcTangentHyperbolic](https://www.mongodb.com/docs/manual/reference/operator/aggregation/atanh/)
```typescript
$ArcTangentHyperbolic('$value')

// operator
{ '$atanh': '$value' }
```
#### [$Average](https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/)
```typescript
$Average('$value')

// operator
{ '$avg': '$value' }
```
```typescript
$Average('$value1', '$value2', '$value3')

// operator
{ '$avg': [ '$value1', '$value2', '$value3' ] }
```
#### [$BinarySize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/binarySize/)
```typescript
$BinarySize('Hello World!')

// operator
{ '$binarySize': 'Hello World!' }
```
#### [$BitwiseAnd](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitAnd/#mongodb-expression-exp.-bitAnd)
```typescript
$BitwiseAnd('$array')

// operator
{ '$bitAnd': '$array' }
```
```typescript
$BitwiseAnd(0, 127, 5)

// operator
{ '$bitAnd': [ 0, 127, 5 ] }
```
#### [$BitwiseNot](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitNot/#mongodb-expression-exp.-bitNot)
```typescript
$BitwiseNot('$long')

// operator
{ '$bitNot': '$long' }
```
#### [$BitwiseOr](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitOr/#mongodb-expression-exp.-bitOr)
```typescript
$BitwiseOr('$array')

// operator
{ '$bitOr': '$array' }
```
```typescript
$BitwiseOr(0, 127, 5)

// operator
{ '$bitOr': [ 0, 127, 5 ] }
```
#### [$BitwiseXor](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitXor/#mongodb-expression-exp.-bitXor)
```typescript
$BitwiseXor('$array')

// operator
{ '$bitXor': '$array' }
```
```typescript
$BitwiseXor(0, 127, 5)

// operator
{ '$bitXor': [ 0, 127, 5 ] }
```
#### [$Bottom](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bottom/#mongodb-group-grp.-bottom)
```typescript
$Bottom(['field1', 'field2'], { field2: -1 })

// operator
{ '$bottom': { output: [ 'field1', 'field2' ], sortBy: { field2: -1 } } }
```
#### [$BottomN](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bottomN/#mongodb-group-grp.-bottomN)
```typescript
$BottomN('field', { field: 1 }, 3)

// operator
{ '$bottomN': { output: 'field', sortBy: { field: 1 }, n: 3 } }
```
#### [$BsonSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bsonSize/)
```typescript
$BsonSize('$$ROOT')

// operator
{ '$bsonSize': '$$ROOT' }
```
#### [$Ceil](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ceil/)
```typescript
$Ceil('$value')

// operator
{ '$ceil': '$value' }
```
#### [$Compare](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cmp/)
```typescript
$Compare('$age', 25)

// operator
{ '$cmp': [ '$age', 25 ] }
```
#### [$Concat](https://www.mongodb.com/docs/manual/reference/operator/aggregation/concat/)
```typescript
$Concat('$first', ' - ', '$second')

// operator
{ '$concat': [ '$first', ' - ', '$second' ] }
```
#### [$ConcatArrays](https://www.mongodb.com/docs/manual/reference/operator/aggregation/concatArrays/)
```typescript
$ConcatArrays('$array', [1, 2, 3])

// operator
{ '$concatArrays': [ '$array', [ 1, 2, 3 ] ] }
```
#### [$Condition](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cond/)
```typescript
$Condition({ $gte: [ '$quantity', 250 ] }, 'true', 'false')

// operator
{ '$cond': [ { '$gte': [ '$quantity', 250 ] }, 'true', 'false' ] }
```
#### [$Convert](https://www.mongodb.com/docs/manual/reference/operator/aggregation/convert/)
```typescript
$Convert(100, 'bool')

// operator
{ '$convert': { input: 100, to: 'bool' } }
```
#### [$Cosine](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cos/)
```typescript
$Cosine('$angle')

// operator
{ '$cos': '$angle' }
```
#### [$CosineHyperbolic](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cosh/)
```typescript
$CosineHyperbolic({ $degreesToRadians : "$angle" })

// operator
{ '$cosh': { '$degreesToRadians': '$angle' } }
```
#### [$Count](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count-accumulator/)
```typescript
$Count()

// operator
{ '$count': {} }
```
#### [$CovariancePopulation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/covariancePop/)
```typescript
$CovariancePopulation('$numeric1', '$numeric2')

// operator
{ '$covariancePopulation': [ '$numeric1', '$numeric2' ] }
```
#### [$CovarianceSample](https://www.mongodb.com/docs/manual/reference/operator/aggregation/covarianceSamp/)
```typescript
$CovarianceSample('$numeric1', '$numeric2')

// operator
{ '$covarianceSample': [ '$numeric1', '$numeric2' ] }
```
#### [$DateAdd](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateAdd/)
```typescript
$DateAdd('$startDate', 'hour', 2)

// operator
{ '$dateAdd': { startDate: '$startDate', unit: 'hour', amount: 2 } }
```
#### [$DateDifference](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateDiff/)
```typescript
$DateDifference('$startDate', '$endDate', 'second')

// operator
{ '$dateDiff': { startDate: '$startDate', endDate: '$endDate', unit: 'second' } }
```
#### [$DateFromParts](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateFromParts/)
```typescript
$DateFromCalendarParts(2000, { month: 12, day: 31, hour: 12, minute: 25, second: 59, timezone: '+01:00' })

// operator
{
  '$dateFromParts': {
    year: 2000,
    month: 12,
    day: 31,
    hour: 12,
    minute: 25,
    second: 59,
    timezone: '+01:00'
  }
}
```
```typescript
$DateFromIsoWeekParts(2000, { isoWeek: 53, isoDayOfWeek: 7, millisecond: 500 })

// operator
{ '$dateFromParts': { isoWeekYear: 2000, isoWeek: 53, isoDayOfWeek: 7, millisecond: 500 } }
```
#### [$DateFromString](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateFromString/)
```typescript
$DateFromString('2017-02-08T12:10:40.787', { timezone: 'America/New_York' })

// operator
{
  '$dateFromString': {
    dateString: '2017-02-08T12:10:40.787',
    timezone: 'America/New_York'
  }
}
```
#### [$DateSubtract](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateSubtract/)
```typescript
$DateSubtract(1697382106124, 'month', 1)

// operator
{ '$dateSubtract': { startDate: 1697382106124, unit: 'month', amount: 1 } }
```
#### [$DateToParts](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateToParts/)
```typescript
$DateToParts(1697382106124)

// operator
{ '$dateToParts': { date: 1697382106124 } }
```
#### [$DateToString](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateToString/)
```typescript
$DateToString(1697382106124)

// operator
{ '$dateToString': { date: 1697382106124 } }
```
#### [$DateTrunc](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/)
```typescript
$DateTrunc(1697382106124, 'month')

// operator
{ '$dateTrunc': { date: 1697382106124, unit: 'month' } }
```
#### [$DayOfMonth](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dayOfMonth/)
```typescript
$DayOfMonth('$date', 'Europe/Paris')

// operator
{ '$dayOfMonth': { date: '$date', timezone: 'Europe/Paris' } }
```
#### [$DayOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dayOfWeek/)
```typescript
$DayOfWeek('$date', '+03:30')

// operator
{ '$dayOfWeek': { date: '$date', timezone: '+03:30' } }
```
#### [$DayOfYear](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dayOfYear/)
```typescript
$DayOfYear('$date')

// operator
{ '$dayOfYear': { date: '$date' } }
```
#### [$DegreesToRadians](https://www.mongodb.com/docs/manual/reference/operator/aggregation/degreesToRadians/)
```typescript
$DegreesToRadians('$angle_a')

// operator
{ '$degreesToRadians': '$angle_a' }
```
#### $DenseRank
```typescript


// operator

```
#### $Derivative
```typescript


// operator

```
#### $Divide
```typescript


// operator

```
#### $DocumentNumber
```typescript


// operator

```
#### $Equal
```typescript


// operator

```
#### $Exponent
```typescript


// operator

```
#### $ExponentialMovingAverage
```typescript


// operator

```
#### $Filter
```typescript


// operator

```
#### $First
```typescript


// operator

```
#### $FirstN
```typescript


// operator

```
```typescript


// operator

```
#### $Floor
```typescript


// operator

```
#### $Function
```typescript


// operator

```
#### $GetField
```typescript


// operator

```
#### $GreaterThan
```typescript


// operator

```
#### $GreaterThanEqual
```typescript


// operator

```
#### $Hour
```typescript


// operator

```
#### $IfNull
```typescript


// operator

```
#### $In
```typescript


// operator

```
#### $IndexOfArray
```typescript


// operator

```
#### $IndexOfBytes
```typescript


// operator

```
#### $IndexOfCodePoint
```typescript


// operator

```
#### $Integral
```typescript


// operator

```
#### $IsArray
```typescript


// operator

```
#### $IsNumber
```typescript


// operator

```
#### $IsoDayOfWeek
```typescript


// operator

```
#### $IsoWeek
```typescript


// operator

```
#### $IsoWeekYear
```typescript


// operator

```
#### $Last
```typescript


// operator

```
#### $LastN
```typescript


// operator

```
```typescript


// operator

```
#### $LessThan
```typescript


// operator

```
#### $LessThanEqual
```typescript


// operator

```
#### $Let
```typescript


// operator

```
#### $Literal
```typescript


// operator

```
#### $Log
```typescript


// operator

```
#### $Log10
```typescript


// operator

```
#### $Ltrim
```typescript


// operator

```
#### $Map
```typescript


// operator

```
#### $Max
```typescript


// operator

```
#### $MergeObjects
```typescript


// operator

```
#### $Meta
```typescript


// operator

```
#### $Millisecond
```typescript


// operator

```
#### $Min
```typescript


// operator

```
#### $Minute
```typescript


// operator

```
#### $Mod
```typescript


// operator

```
#### $Month
```typescript


// operator

```
#### $Multiply
```typescript


// operator

```
#### $NaturalLog
```typescript


// operator

```
#### $Not
```typescript


// operator

```
#### $NotEqual
```typescript


// operator

```
#### $ObjectToArray
```typescript


// operator

```
#### $Or
```typescript


// operator

```
#### $Pow
```typescript


// operator

```
#### $Push
```typescript


// operator

```
#### $RadiansToDegrees
```typescript


// operator

```
#### $Rand
```typescript


// operator

```
#### $Range
```typescript


// operator

```
#### $Reduce
```typescript


// operator

```
#### $RegexFind
```typescript


// operator

```
#### $RegexFindAll
```typescript


// operator

```
#### $RegexMatch
```typescript


// operator

```
#### $ReplaceAll
```typescript


// operator

```
#### $ReplaceOne
```typescript


// operator

```
#### $ReverseArray
```typescript


// operator

```
#### $Round
```typescript


// operator

```
#### $Rtrim
```typescript


// operator

```
#### $SampleRate
```typescript


// operator

```
#### $Second
```typescript


// operator

```
#### $SetDifference
```typescript


// operator

```
#### $SetEquals
```typescript


// operator

```
#### $SetIntersection
```typescript


// operator

```
#### $SetIsSubset
```typescript


// operator

```
#### $SetUnion
```typescript


// operator

```
#### $Sin
```typescript


// operator

```
#### $Sinh
```typescript


// operator

```
#### $Size
```typescript


// operator

```
#### $Slice
```typescript


// operator

```
#### $Split
```typescript


// operator

```
#### $Sqrt
```typescript


// operator

```
#### $StdDevPop
```typescript


// operator

```
#### $StdDevSamp
```typescript


// operator

```
#### $StrCaseCmp
```typescript


// operator

```
#### $StrLenBytes
```typescript


// operator

```
#### $StrLenCP
```typescript


// operator

```
#### $Substr
```typescript


// operator

```
#### $SubstrBytes
```typescript


// operator

```
#### $SubstrCP
```typescript


// operator

```
#### $Subtract
```typescript


// operator

```
#### $Sum
```typescript


// operator

```
#### $Switch
```typescript


// operator

```
#### $Tan
```typescript


// operator

```
#### $Tanh
```typescript


// operator

```
#### $ToBool
```typescript


// operator

```
#### $ToDate
```typescript


// operator

```
#### $ToDecimal
```typescript


// operator

```
#### $ToDouble
```typescript


// operator

```
#### $ToInt
```typescript


// operator

```
#### $ToLong
```typescript


// operator

```
#### $ToLower
```typescript


// operator

```
#### $ToObjectId
```typescript


// operator

```
#### $ToString
```typescript


// operator

```
#### $ToUpper
```typescript


// operator

```
#### $Trim
```typescript


// operator

```
#### $Trunc
```typescript


// operator

```
#### $Type
```typescript


// operator

```
#### $Week
```typescript


// operator

```
#### $Year
```typescript


// operator

```
#### $Zip
```typescript


// operator

```


