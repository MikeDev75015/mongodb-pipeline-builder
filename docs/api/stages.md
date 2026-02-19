# MongoDB Aggregation Stages Reference

Complete reference for all MongoDB aggregation stages supported by Pipeline Builder.

## Table of Contents

- [Custom Stages](#custom-stages)
- [Data Transformation](#data-transformation)
- [Filtering & Matching](#filtering--matching)
- [Sorting & Limiting](#sorting--limiting)
- [Grouping & Aggregation](#grouping--aggregation)
- [Joining Collections](#joining-collections)
- [Output Stages](#output-stages)
- [Search & Text](#search--text)
- [Stream Processing](#stream-processing)
- [Utility Stages](#utility-stages)

---

## Custom Stages

### Paging(elementsPerPage, page)

**Purpose:** Automatically adds pagination stages (`$skip`, `$limit`, `$count`) wrapped in `$facet`.

```typescript
builder.Paging(20, 2).build();
```

**Output:**
```typescript
[
  {
    $facet: {
      docs: [
        { $skip: 20 },
        { $limit: 20 }
      ],
      count: [
        { $count: 'totalElements' }
      ]
    }
  }
]
```

**Notes:**
- Page parameter defaults to 1
- Must be used with `GetPagingResult` method
- Cannot be combined with `Out` or `Merge` stages

---

### Insert(stage)

**Purpose:** Insert any custom stage without validation.

```typescript
builder.Insert({ $myCustomStage: { field: 'value' } }).build();
```

**Output:**
```typescript
[
  { $myCustomStage: { field: 'value' } }
]
```

**Use Cases:**
- New MongoDB stages not yet supported
- Custom stages in MongoDB forks
- Experimental features
- Bypassing validation when needed

---

## Data Transformation

### AddFields(...fields)

**Purpose:** Add new fields to documents.  
**Helper:** `Field(name, value)`  
**Docs:** [$addFields](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/)

```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.AddFields(
  Field('fullName', { $concat: ['$firstName', ' ', '$lastName'] }),
  Field('totalPrice', { $multiply: ['$price', '$quantity'] })
).build();
```

**Output:**
```typescript
[
  {
    $addFields: {
      fullName: { $concat: ['$firstName', ' ', '$lastName'] },
      totalPrice: { $multiply: ['$price', '$quantity'] }
    }
  }
]
```

---

### Set(...fields)

**Purpose:** Alias for `$addFields` - adds or replaces fields.  
**Helper:** `Field(name, value)`  
**Docs:** [$set](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/)

```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.Set(
  Field('status', 'active'),
  Field('updatedAt', new Date())
).build();
```

---

### Project(...fields)

**Purpose:** Select or exclude fields from documents.  
**Helpers:**
- `ProjectOnlyHelper(...fields)` - Include only specified fields (excludes `_id`)
- `ProjectIgnoreHelper(...fields)` - Exclude specified fields
- `ProjectHelper(field, value)` - Custom projections

**Docs:** [$project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)

#### Example 1: Include only specific fields

```typescript
import { ProjectOnlyHelper } from 'mongodb-pipeline-builder/helpers';

builder.Project(ProjectOnlyHelper('name', 'email', 'age')).build();
```

**Output:**
```typescript
[
  { $project: { _id: 0, name: 1, email: 1, age: 1 } }
]
```

#### Example 2: Exclude specific fields

```typescript
import { ProjectIgnoreHelper } from 'mongodb-pipeline-builder/helpers';

builder.Project(ProjectIgnoreHelper('password', 'refreshToken')).build();
```

**Output:**
```typescript
[
  { $project: { password: 0, refreshToken: 0 } }
]
```

#### Example 3: Custom projections with computed fields

```typescript
import { ProjectHelper } from 'mongodb-pipeline-builder/helpers';

builder.Project(
  ProjectHelper('name', 1),
  ProjectHelper('age', '$user.age'),
  ProjectHelper('isAdult', { $gte: ['$age', 18] })
).build();
```

**Output:**
```typescript
[
  {
    $project: {
      name: 1,
      age: '$user.age',
      isAdult: { $gte: ['$age', 18] }
    }
  }
]
```

---

### Unset(...fields)

**Purpose:** Remove fields from documents.  
**Docs:** [$unset](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/)

```typescript
builder.Unset('password', 'refreshToken', 'internalId').build();
```

**Output:**
```typescript
[
  { $unset: ['password', 'refreshToken', 'internalId'] }
]
```

---

### ReplaceRoot(value)

**Purpose:** Replace the input document with a new document.  
**Docs:** [$replaceRoot](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/)

```typescript
builder.ReplaceRoot({
  newRoot: { 
    fullName: { $concat: ['$first_name', ' ', '$last_name'] },
    email: '$email'
  }
}).build();
```

---

### ReplaceWith(value)

**Purpose:** Simpler alias for `$replaceRoot`.  
**Docs:** [$replaceWith](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceWith/)

```typescript
builder.ReplaceWith('$profile').build();
```

**Output:**
```typescript
[
  { $replaceWith: '$profile' }
]
```

---

### Unwind(value)

**Purpose:** Deconstruct an array field into multiple documents.  
**Docs:** [$unwind](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/)

```typescript
// Simple unwind
builder.Unwind({ path: '$items' }).build();

// Preserve null/empty arrays
builder.Unwind({ 
  path: '$items',
  preserveNullAndEmptyArrays: true 
}).build();

// Include array index
builder.Unwind({
  path: '$items',
  includeArrayIndex: 'itemIndex'
}).build();
```

---

## Filtering & Matching

### Match(condition)

**Purpose:** Filter documents based on conditions.  
**Helper:** `Field(name, value)` for simple equality  
**Operator:** `$Expression()` for complex expressions  
**Docs:** [$match](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)

#### Example 1: Simple equality with Field helper

```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.Match(Field('status', 'active')).build();
```

**Output:**
```typescript
[
  { $match: { status: 'active' } }
]
```

#### Example 2: Complex expression with operators

```typescript
import { $Expression, $And, $Equal, $GreaterThan } from 'mongodb-pipeline-builder/operators';

builder.Match($Expression(
  $And(
    $Equal('$status', 'active'),
    $GreaterThan('$age', 18)
  )
)).build();
```

**Output:**
```typescript
[
  { 
    $match: { 
      $expr: { 
        $and: [
          { $eq: ['$status', 'active'] },
          { $gt: ['$age', 18] }
        ]
      } 
    } 
  }
]
```

#### Example 3: Multiple conditions

```typescript
import { $Expression, $And, $Equal, $GreaterThanEqual, $LessThanEqual } from 'mongodb-pipeline-builder/operators';

builder.Match($Expression(
  $And(
    $Equal('$category', 'electronics'),
    $GreaterThanEqual('$price', 100),
    $LessThanEqual('$price', 1000)
  )
)).build();
```

---

### Redact(expression)

**Purpose:** Restrict document content based on security rules.  
**Docs:** [$redact](https://www.mongodb.com/docs/manual/reference/operator/aggregation/redact/)

```typescript
builder.Redact(
  $Condition(
    $GreaterThan($Size($SetIntersection('$tags', ['public'])), 0),
    '$$DESCEND',
    '$$PRUNE'
  )
).build();
```

---

## Sorting & Limiting

### Sort(...fields)

**Purpose:** Sort documents.  
**Helper:** `Field(name, order)` where order is 1 (asc) or -1 (desc)  
**Docs:** [$sort](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/)

#### Example 1: Sort with Field helper

```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.Sort(
  Field('priority', -1),
  Field('createdAt', -1),
  Field('name', 1)
).build();
```

**Output:**
```typescript
[
  {
    $sort: {
      priority: -1,
      createdAt: -1,
      name: 1
    }
  }
]
```

#### Example 2: Sort with object notation

```typescript
builder.Sort({ 
  price: -1,
  rating: -1,
  name: 1
}).build();
```

**Output:**
```typescript
[
  {
    $sort: {
      price: -1,
      rating: -1,
      name: 1
    }
  }
]
```

---

### Limit(count)

**Purpose:** Limit the number of documents.  
**Docs:** [$limit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/)

```typescript
builder.Limit(10).build();
```

---

### Skip(count)

**Purpose:** Skip a specified number of documents.  
**Docs:** [$skip](https://www.mongodb.com/docs/manual/reference/operator/aggregation/skip/)

```typescript
builder.Skip(20).build();
```

---

### Sample(value)

**Purpose:** Randomly select documents.  
**Helper:** `SampleHelper(size)`  
**Docs:** [$sample](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/)

```typescript
import { SampleHelper } from 'mongodb-pipeline-builder/helpers';

builder.Sample(SampleHelper(100)).build();
```

**Output:**
```typescript
[
  { $sample: { size: 100 } }
]
```

**Use Cases:**
- Get random sample for testing
- Random product recommendations
- Survey sampling

---

## Grouping & Aggregation

### Group(specification)

**Purpose:** Group documents by a key and perform aggregations.  
**Docs:** [$group](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)

```typescript
import { $Sum, $Average, $Min, $Max } from 'mongodb-pipeline-builder/operators';

builder.Group({
  _id: '$category',
  totalSales: $Sum('$amount'),
  averagePrice: $Average('$price'),
  minPrice: $Min('$price'),
  maxPrice: $Max('$price'),
  count: $Sum(1)
}).build();
```

**Output:**
```typescript
[
  {
    $group: {
      _id: '$category',
      totalSales: { $sum: '$amount' },
      averagePrice: { $avg: '$price' },
      minPrice: { $min: '$price' },
      maxPrice: { $max: '$price' },
      count: { $sum: 1 }
    }
  }
]
```

---

### Bucket(value)

**Purpose:** Categorize documents into buckets based on a field.  
**Helper:** `BucketHelper(groupBy, boundaries, optional)`  
**Docs:** [$bucket](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/)

```typescript
import { BucketHelper } from 'mongodb-pipeline-builder/helpers';

builder.Bucket(BucketHelper(
  '$age',
  [0, 18, 30, 50, 100],
  { 
    default: 'Other',
    output: {
      count: { $sum: 1 },
      users: { $push: '$name' }
    }
  }
)).build();
```

**Output:**
```typescript
[
  {
    $bucket: {
      groupBy: '$age',
      boundaries: [0, 18, 30, 50, 100],
      default: 'Other',
      output: {
        count: { $sum: 1 },
        users: { $push: '$name' }
      }
    }
  }
]
```

**Use Cases:**
- Age groups categorization
- Price ranges
- Score distributions

---

### BucketAuto(value)

**Purpose:** Automatically determine bucket boundaries.  
**Helper:** `BucketAutoHelper(groupBy, buckets, optional)`  
**Docs:** [$bucketAuto](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucketAuto/)

```typescript
import { BucketAutoHelper } from 'mongodb-pipeline-builder/helpers';

builder.BucketAuto(BucketAutoHelper(
  '$price',
  5,
  { output: { count: { $sum: 1 }, avgPrice: { $avg: '$price' } } }
)).build();
```

**Output:**
```typescript
[
  {
    $bucketAuto: {
      groupBy: '$price',
      buckets: 5,
      output: {
        count: { $sum: 1 },
        avgPrice: { $avg: '$price' }
      }
    }
  }
]
```

**Use Cases:**
- Automatic distribution analysis
- Equal distribution bucketing
- Data visualization preparation

---

### Count(fieldName)

**Purpose:** Count the number of documents.  
**Docs:** [$count](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/)

```typescript
builder.Count('totalUsers').build();
```

**Output:**
```typescript
[
  { $count: 'totalUsers' }
]
```

---

### SortByCount(expression)

**Purpose:** Group by expression and count, then sort by count descending.  
**Docs:** [$sortByCount](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortByCount/)

```typescript
builder.SortByCount('$category').build();
```

**Output:**
```typescript
[
  { $sortByCount: '$category' }
]
```

---

### SetWindowFields(specification)

**Purpose:** Perform operations on a window of documents.  
**Docs:** [$setWindowFields](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/)

```typescript
builder.SetWindowFields({
  partitionBy: '$category',
  sortBy: { date: 1 },
  output: {
    cumulativeTotal: {
      $sum: '$amount',
      window: { documents: ['unbounded', 'current'] }
    },
    rank: {
      $rank: {}
    }
  }
}).build();
```

---

## Joining Collections

### Lookup(specification)

**Purpose:** Perform a left outer join with another collection.  
**Helpers:**
- `LookupEqualityHelper(from, as, localField, foreignField)` - Simple equality join
- `LookupConditionHelper(from, as, optional)` - Complex conditions

**Docs:** [$lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)

#### Example 1: Simple equality lookup with LookupEqualityHelper

```typescript
import { LookupEqualityHelper } from 'mongodb-pipeline-builder/helpers';

builder.Lookup(LookupEqualityHelper(
  'orders',        // from collection
  'userOrders',    // output array field
  '_id',           // local field
  'userId'         // foreign field
)).build();
```

**Output:**
```typescript
[
  {
    $lookup: {
      from: 'orders',
      localField: '_id',
      foreignField: 'userId',
      as: 'userOrders'
    }
  }
]
```

#### Example 2: Lookup with conditions (pipeline syntax)

```typescript
builder.Lookup({
  from: 'orders',
  let: { userId: '$_id' },
  pipeline: [
    { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
    { $sort: { createdAt: -1 } },
    { $limit: 10 }
  ],
  as: 'recentOrders'
}).build();
```

**Output:**
```typescript
[
  {
    $lookup: {
      from: 'orders',
      let: { userId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
        { $sort: { createdAt: -1 } },
        { $limit: 10 }
      ],
      as: 'recentOrders'
    }
  }
]
```

> 📖 **Learn More:** See [Lookup Examples](../examples/lookups.md) for advanced patterns

---

### GraphLookup(specification)

**Purpose:** Perform recursive search on a collection (graph traversal).  
**Docs:** [$graphLookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/)

```typescript
builder.GraphLookup({
  from: 'employees',
  startWith: '$managerId',
  connectFromField: 'managerId',
  connectToField: '_id',
  as: 'reportingHierarchy',
  maxDepth: 5,
  depthField: 'level'
}).build();
```

---

### UnionWith(value)

**Purpose:** Combine documents from multiple collections.  
**Helper:** `UnionWithHelper(collection, pipeline)`  
**Docs:** [$unionWith](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unionWith/)

#### Example 1: Simple union

```typescript
import { UnionWithHelper } from 'mongodb-pipeline-builder/helpers';

builder.UnionWith(UnionWithHelper('archivedOrders')).build();
```

**Output:**
```typescript
[
  {
    $unionWith: { coll: 'archivedOrders' }
  }
]
```

#### Example 2: Union with pipeline filter

```typescript
import { UnionWithHelper } from 'mongodb-pipeline-builder/helpers';

builder.UnionWith(UnionWithHelper(
  'archivedOrders',
  [{ $match: { year: 2023 } }]
)).build();
```

**Output:**
```typescript
[
  {
    $unionWith: {
      coll: 'archivedOrders',
      pipeline: [{ $match: { year: 2023 } }]
    }
  }
]
```

---

## Output Stages

### Out(value)

**Purpose:** Write results to a collection (replaces collection).  
**Helper:** `OutHelper(collection, optional)`  
**Docs:** [$out](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/)

```typescript
import { OutHelper } from 'mongodb-pipeline-builder/helpers';

builder.Out(OutHelper('outputCollection')).build();
```

**Output:**
```typescript
[
  { $out: 'outputCollection' }
]
```

**Warning:** Cannot appear multiple times in a pipeline.

---

### Merge(value)

**Purpose:** Write results to a collection (upserts/merges).  
**Helper:** `MergeHelper(into, optional)`  
**Docs:** [$merge](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/)

```typescript
import { MergeHelper } from 'mongodb-pipeline-builder/helpers';

builder.Merge(MergeHelper(
  'targetCollection',
  {
    on: '_id',
    whenMatched: 'merge',
    whenNotMatched: 'insert'
  }
)).build();
```

**Output:**
```typescript
[
  {
    $merge: {
      into: 'targetCollection',
      on: '_id',
      whenMatched: 'merge',
      whenNotMatched: 'insert'
    }
  }
]
```

**Warning:** Cannot appear multiple times in a pipeline.

---

## Search & Text

### Search(value)

**Purpose:** Perform full-text search (Atlas Search).  
**Helper:** `SearchHelper(operator | collector, optional)`  
**Docs:** [$search](https://www.mongodb.com/docs/manual/reference/operator/aggregation/search/)

```typescript
import { SearchHelper } from 'mongodb-pipeline-builder/helpers';

builder.Search(SearchHelper({
  text: {
    query: 'mongodb',
    path: ['title', 'description']
  }
})).build();
```

**Output:**
```typescript
[
  {
    $search: {
      text: {
        query: 'mongodb',
        path: ['title', 'description']
      }
    }
  }
]
```

---

### SearchMeta(value)

**Purpose:** Return only search metadata (no documents).  
**Helper:** `SearchMetaHelper(collector, optional)`  
**Docs:** [$searchMeta](https://www.mongodb.com/docs/manual/reference/operator/aggregation/searchMeta/)

```typescript
import { SearchMetaHelper } from 'mongodb-pipeline-builder/helpers';

builder.SearchMeta(SearchMetaHelper({
  facet: {
    operator: {
      text: { query: 'mongodb', path: 'description' }
    },
    facets: {
      categoryFacet: { type: 'string', path: 'category' }
    }
  }
})).build();
```

**Output:**
```typescript
[
  {
    $searchMeta: {
      facet: {
        operator: {
          text: { query: 'mongodb', path: 'description' }
        },
        facets: {
          categoryFacet: { type: 'string', path: 'category' }
        }
      }
    }
  }
]
```

---

### GeoNear(value)

**Purpose:** Find documents near a geographic location.  
**Helper:** `GeoNearHelper(near, distanceField, optional)`  
**Docs:** [$geoNear](https://www.mongodb.com/docs/manual/reference/operator/aggregation/geoNear/)

```typescript
import { GeoNearHelper } from 'mongodb-pipeline-builder/helpers';

builder.GeoNear(GeoNearHelper(
  { type: 'Point', coordinates: [-73.99279, 40.719296] },
  'distance',
  {
    maxDistance: 5000,
    spherical: true
  }
)).build();
```

**Output:**
```typescript
[
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [-73.99279, 40.719296] },
      distanceField: 'distance',
      maxDistance: 5000,
      spherical: true
    }
  }
]
```

**Warning:** 
- Must be the first stage in pipeline
- Cannot appear multiple times

---

## Stream Processing

### ChangeStream(value)

**Purpose:** Monitor collection changes in real-time.  
**Helper:** `ChangeStreamHelper(optional)`  
**Docs:** [$changeStream](https://www.mongodb.com/docs/manual/reference/operator/aggregation/changeStream/)

```typescript
import { ChangeStreamHelper } from 'mongodb-pipeline-builder/helpers';

builder.ChangeStream(ChangeStreamHelper({
  fullDocument: 'updateLookup',
  fullDocumentBeforeChange: 'whenAvailable'
})).build();
```

**Output:**
```typescript
[
  {
    $changeStream: {
      fullDocument: 'updateLookup',
      fullDocumentBeforeChange: 'whenAvailable'
    }
  }
]
```

**Warning:** Cannot appear multiple times in a pipeline.

---

### ChangeStreamSplitLargeEvent()

**Purpose:** Split large change stream events into fragments.  
**Docs:** [$changeStreamSplitLargeEvent](https://www.mongodb.com/docs/manual/reference/operator/aggregation/changeStreamSplitLargeEvent/)

```typescript
builder.ChangeStreamSplitLargeEvent().build();
```

---

## Utility Stages

### Facet(...pipelines)

**Purpose:** Process multiple aggregation pipelines in parallel.  
**Helper:** `Field(name, pipeline)`  
**Docs:** [$facet](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/)

```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.Facet(
  Field('priceRanges', [
    { $bucket: { groupBy: '$price', boundaries: [0, 50, 100, 200] } }
  ]),
  Field('categories', [
    { $sortByCount: '$category' }
  ]),
  Field('topProducts', [
    { $sort: { sales: -1 } },
    { $limit: 5 }
  ])
).build();
```

**Output:**
```typescript
[
  {
    $facet: {
      priceRanges: [
        { $bucket: { groupBy: '$price', boundaries: [0, 50, 100, 200] } }
      ],
      categories: [
        { $sortByCount: '$category' }
      ],
      topProducts: [
        { $sort: { sales: -1 } },
        { $limit: 5 }
      ]
    }
  }
]
```

---

### Documents(...docs)

**Purpose:** Create documents inline (without reading from collection).  
**Docs:** [$documents](https://www.mongodb.com/docs/manual/reference/operator/aggregation/documents/)

```typescript
builder.Documents(
  { _id: 1, name: 'John', age: 30 },
  { _id: 2, name: 'Jane', age: 25 },
  { _id: 3, name: 'Bob', age: 35 }
).build();
```

**Output:**
```typescript
[
  {
    $documents: [
      { _id: 1, name: 'John', age: 30 },
      { _id: 2, name: 'Jane', age: 25 },
      { _id: 3, name: 'Bob', age: 35 }
    ]
  }
]
```

---

### Densify(value)

**Purpose:** Fill gaps in time-series or numeric data.  
**Helper:** `DensifyHelper(field, range, optional)`  
**Docs:** [$densify](https://www.mongodb.com/docs/manual/reference/operator/aggregation/densify/)

```typescript
import { DensifyHelper } from 'mongodb-pipeline-builder/helpers';

builder.Densify(DensifyHelper(
  'timestamp',
  {
    bounds: 'full',
    step: 1,
    unit: 'hour'
  },
  { partitionByFields: ['sensor'] }
)).build();
```

**Output:**
```typescript
[
  {
    $densify: {
      field: 'timestamp',
      range: {
        bounds: 'full',
        step: 1,
        unit: 'hour'
      },
      partitionByFields: ['sensor']
    }
  }
]
```

---

### Fill(value)

**Purpose:** Fill missing field values.  
**Helper:** `FillHelper(output, optional)`  
**Docs:** [$fill](https://www.mongodb.com/docs/manual/reference/operator/aggregation/fill/)

```typescript
import { FillHelper } from 'mongodb-pipeline-builder/helpers';

builder.Fill(FillHelper({
  temperature: { method: 'linear' },
  status: { value: 'unknown' }
})).build();
```

**Output:**
```typescript
[
  {
    $fill: {
      output: {
        temperature: { method: 'linear' },
        status: { value: 'unknown' }
      }
    }
  }
]
```

---

### IndexStats()

**Purpose:** Return statistics about index usage.  
**Docs:** [$indexStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexStats/)

```typescript
builder.IndexStats().build();
```

---

### CollStats(value)

**Purpose:** Return statistics about the collection.  
**Helper:** `CollStatsHelper(optional)`  
**Docs:** [$collStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/collStats/)

```typescript
import { CollStatsHelper } from 'mongodb-pipeline-builder/helpers';

builder.CollStats(CollStatsHelper({
  latencyStats: { histograms: true },
  storageStats: { scale: 1024 }
})).build();
```

**Output:**
```typescript
[
  {
    $collStats: {
      latencyStats: { histograms: true },
      storageStats: { scale: 1024 }
    }
  }
]
```

---

### PlanCacheStats()

**Purpose:** Return query plan cache statistics.  
**Docs:** [$planCacheStats](https://www.mongodb.com/docs/manual/reference/operator/aggregation/planCacheStats/)

```typescript
builder.PlanCacheStats().build();
```

**Output:**
```typescript
[
  { $planCacheStats: {} }
]
```

---

### CurrentOp(value)

**Purpose:** Return information about current operations.  
**Helper:** `CurrentOpHelper(optional)`  
**Docs:** [$currentOp](https://www.mongodb.com/docs/manual/reference/operator/aggregation/currentOp/)

```typescript
import { CurrentOpHelper } from 'mongodb-pipeline-builder/helpers';

builder.CurrentOp(CurrentOpHelper({
  allUsers: true,
  idleConnections: false
})).build();
```

**Output:**
```typescript
[
  {
    $currentOp: {
      allUsers: true,
      idleConnections: false
    }
  }
]
```

---

### ListSessions(value)

**Purpose:** List all active sessions.  
**Docs:** [$listSessions](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSessions/)

```typescript
builder.ListSessions({ allUsers: true }).build();
```

---

### ListLocalSessions(value)

**Purpose:** List sessions cached locally.  
**Docs:** [$listLocalSessions](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listLocalSessions/)

```typescript
builder.ListLocalSessions({ allUsers: false }).build();
```

---

### ListSampledQueries(value)

**Purpose:** List sampled queries.  
**Docs:** [$listSampledQueries](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSampledQueries/)

```typescript
builder.ListSampledQueries({ namespace: 'mydb.users' }).build();
```

---

### ListSearchIndexes(value)

**Purpose:** List Atlas Search indexes.  
**Docs:** [$listSearchIndexes](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSearchIndexes/)

```typescript
builder.ListSearchIndexes({ name: 'default' }).build();
```

---

### ShardedDataDistribution(value)

**Purpose:** Return data distribution across shards.  
**Docs:** [$shardedDataDistribution](https://www.mongodb.com/docs/manual/reference/operator/aggregation/shardedDataDistribution/)

```typescript
builder.ShardedDataDistribution({}).build();
```

---

## Summary

### Stage Categories

| Category | Stages |
|----------|--------|
| **Custom** | Paging, Insert |
| **Filtering** | Match, Redact |
| **Transformation** | AddFields, Set, Project, Unset, ReplaceRoot, ReplaceWith, Unwind |
| **Sorting/Limiting** | Sort, Limit, Skip, Sample |
| **Grouping** | Group, Bucket, BucketAuto, Count, SortByCount, SetWindowFields |
| **Joining** | Lookup, GraphLookup, UnionWith |
| **Output** | Out, Merge |
| **Search** | Search, SearchMeta, GeoNear |
| **Streaming** | ChangeStream, ChangeStreamSplitLargeEvent |
| **Utility** | Facet, Documents, Densify, Fill, IndexStats, CollStats, etc. |

### Non-Duplicable Stages

These stages can only appear **once** in a pipeline:
- `Out`
- `Merge`
- `GeoNear` (must also be first)
- `ChangeStream`
- `ChangeStreamSplitLargeEvent`
- `Paging`

---

## Complete Helpers Reference

All helpers are imported from `mongodb-pipeline-builder/helpers`:

### Universal Helpers

#### Field(name, value)
Create field specifications for various stages.

```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

// Used in AddFields, Set, Sort, Match, Facet, etc.
Field('name', 'value')
Field('priority', -1)  // For sorting
Field('status', 'active')  // For matching
```

---

### Stage-Specific Helpers

#### Project Helpers

```typescript
import { 
  ProjectOnlyHelper,
  ProjectIgnoreHelper,
  ProjectHelper 
} from 'mongodb-pipeline-builder/helpers';

// Include only specific fields (excludes _id)
ProjectOnlyHelper('name', 'email', 'age')

// Exclude specific fields
ProjectIgnoreHelper('password', 'refreshToken')

// Custom projection
ProjectHelper('fieldName', value)
```

---

#### Lookup Helpers

```typescript
import { 
  LookupEqualityHelper,
  LookupConditionHelper 
} from 'mongodb-pipeline-builder/helpers';

// Simple equality lookup
LookupEqualityHelper('fromCollection', 'asField', 'localField', 'foreignField')

// Complex conditional lookup
LookupConditionHelper('fromCollection', 'asField', { /* optional params */ })
```

---

#### Bucket Helpers

```typescript
import { 
  BucketHelper,
  BucketAutoHelper 
} from 'mongodb-pipeline-builder/helpers';

// Manual bucket boundaries
BucketHelper('$field', [0, 10, 20, 30], { 
  default: 'Other',
  output: { count: { $sum: 1 } }
})

// Automatic bucket distribution
BucketAutoHelper('$field', numberOfBuckets, { 
  output: { count: { $sum: 1 } }
})
```

---

#### Output Helpers

```typescript
import { 
  OutHelper,
  MergeHelper 
} from 'mongodb-pipeline-builder/helpers';

// Write to collection (replace)
OutHelper('targetCollection', { /* optional params */ })

// Merge to collection (upsert)
MergeHelper('targetCollection', {
  on: '_id',
  whenMatched: 'merge',
  whenNotMatched: 'insert'
})
```

---

#### Search Helpers

```typescript
import { 
  SearchHelper,
  SearchMetaHelper 
} from 'mongodb-pipeline-builder/helpers';

// Full-text search
SearchHelper({
  text: {
    query: 'search term',
    path: ['field1', 'field2']
  }
})

// Search metadata
SearchMetaHelper({
  facet: {
    operator: { /* search operator */ },
    facets: { /* facet definitions */ }
  }
})
```

---

#### Geospatial Helper

```typescript
import { GeoNearHelper } from 'mongodb-pipeline-builder/helpers';

// Geospatial queries
GeoNearHelper(
  { type: 'Point', coordinates: [longitude, latitude] },
  'distanceField',
  {
    maxDistance: 5000,
    spherical: true
  }
)
```

---

#### Time-Series Helpers

```typescript
import { 
  DensifyHelper,
  FillHelper 
} from 'mongodb-pipeline-builder/helpers';

// Fill gaps in time-series
DensifyHelper('timestampField', {
  bounds: 'full',
  step: 1,
  unit: 'hour'
}, {
  partitionByFields: ['sensor']
})

// Fill missing values
FillHelper({
  field1: { method: 'linear' },
  field2: { value: 'default' }
})
```

---

#### Stream Processing Helper

```typescript
import { ChangeStreamHelper } from 'mongodb-pipeline-builder/helpers';

// Monitor collection changes
ChangeStreamHelper({
  fullDocument: 'updateLookup',
  fullDocumentBeforeChange: 'whenAvailable'
})
```

---

#### Utility Helpers

```typescript
import { 
  SampleHelper,
  UnionWithHelper,
  CollStatsHelper,
  CurrentOpHelper 
} from 'mongodb-pipeline-builder/helpers';

// Random sample
SampleHelper(size)

// Union collections
UnionWithHelper('collection', [/* optional pipeline */])

// Collection statistics
CollStatsHelper({
  latencyStats: { histograms: true },
  storageStats: { scale: 1024 }
})

// Current operations
CurrentOpHelper({
  allUsers: true,
  idleConnections: false
})
```

---

### Helper Usage Summary

| Helper | Stage(s) | Purpose |
|--------|----------|---------|
| `Field` | Multiple | Universal field specification |
| `ProjectOnlyHelper` | Project | Include specific fields only |
| `ProjectIgnoreHelper` | Project | Exclude specific fields |
| `ProjectHelper` | Project | Custom field projections |
| `LookupEqualityHelper` | Lookup | Simple equality joins |
| `LookupConditionHelper` | Lookup | Complex conditional joins |
| `BucketHelper` | Bucket | Manual bucket boundaries |
| `BucketAutoHelper` | BucketAuto | Automatic bucketing |
| `OutHelper` | Out | Write to collection |
| `MergeHelper` | Merge | Merge to collection |
| `SearchHelper` | Search | Full-text search |
| `SearchMetaHelper` | SearchMeta | Search metadata |
| `GeoNearHelper` | GeoNear | Geospatial queries |
| `DensifyHelper` | Densify | Fill time-series gaps |
| `FillHelper` | Fill | Fill missing values |
| `ChangeStreamHelper` | ChangeStream | Monitor changes |
| `SampleHelper` | Sample | Random sampling |
| `UnionWithHelper` | UnionWith | Combine collections |
| `CollStatsHelper` | CollStats | Collection statistics |
| `CurrentOpHelper` | CurrentOp | Current operations |

---

## Related Documentation

- [Getting Started](../getting-started.md)
- [Operators Reference](./operators.md)
- [Helpers Reference](./helpers.md)
- [Pagination Examples](../examples/pagination.md)
- [Lookup Examples](../examples/lookups.md)

