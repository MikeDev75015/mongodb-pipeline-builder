# MongoDB Pipeline Builder Helpers Reference

Helpers are utility functions that simplify building MongoDB aggregation stages by providing a typed API and better developer experience.

## Table of Contents

- [Universal Helpers](#universal-helpers)
- [Projection Helpers](#projection-helpers)
- [Join Helpers](#join-helpers)
- [Grouping Helpers](#grouping-helpers)
- [Output Helpers](#output-helpers)
- [Search Helpers](#search-helpers)
- [Geospatial Helpers](#geospatial-helpers)
- [Time Series Helpers](#time-series-helpers)
- [Streaming Helpers](#streaming-helpers)
- [Utility Helpers](#utility-helpers)
- [Summary Table](#summary-table)

---

## Universal Helpers

### Field(name, value)

**Stage(s):** `Match`, `AddFields`, `Set`, `Sort`, `Facet`, and others  
**Description:** Creates a JavaScript object with the name and value passed as parameters.

**Signature:**
```typescript
Field(name: string, value: any): { [name: string]: any }
```

**Usage Examples:**

#### With Match (filtering)
```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.Match(Field('status', 'active')).build();
```

**Result:**
```typescript
[{ $match: { status: 'active' } }]
```

#### With AddFields (adding fields)
```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.AddFields(
  Field('fullName', { $concat: ['$firstName', ' ', '$lastName'] }),
  Field('isAdult', { $gte: ['$age', 18] })
).build();
```

**Result:**
```typescript
[{
  $addFields: {
    fullName: { $concat: ['$firstName', ' ', '$lastName'] },
    isAdult: { $gte: ['$age', 18] }
  }
}]
```

#### With Sort (sorting)
```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.Sort(
  Field('createdAt', -1),  // Descending sort
  Field('name', 1)         // Ascending sort
).build();
```

**Result:**
```typescript
[{
  $sort: {
    createdAt: -1,
    name: 1
  }
}]
```

#### With Facet (parallel pipelines)
```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

builder.Facet(
  Field('byCategory', [{ $sortByCount: '$category' }]),
  Field('priceStats', [{ $group: { _id: null, avg: { $avg: '$price' } } }])
).build();
```

**Result:**
```typescript
[{
  $facet: {
    byCategory: [{ $sortByCount: '$category' }],
    priceStats: [{ $group: { _id: null, avg: { $avg: '$price' } } }]
  }
}]
```

---

### List(...args)

**Stage(s):** General usage  
**Description:** Creates a list with the elements passed as parameters.

**Signature:**
```typescript
List(...args: unknown[]): unknown[]
```

**Usage Example:**
```typescript
import { List } from 'mongodb-pipeline-builder/helpers';

const tags = List('mongodb', 'javascript', 'nodejs');
// Result: ['mongodb', 'javascript', 'nodejs']
```

---

## Projection Helpers

### ProjectHelper(field, value)

**Stage:** `Project`  
**Description:** Creates a custom projection for a specific field.

**Signature:**
```typescript
ProjectHelper(field: string, value: ProjectValue): ProjectStage
```

**Usage Example:**
```typescript
import { ProjectHelper } from 'mongodb-pipeline-builder/helpers';

builder.Project(
  ProjectHelper('name', 1),
  ProjectHelper('email', 1),
  ProjectHelper('age', '$user.age'),
  ProjectHelper('isAdult', { $gte: ['$age', 18] })
).build();
```

**Result:**
```typescript
[{
  $project: {
    name: 1,
    email: 1,
    age: '$user.age',
    isAdult: { $gte: ['$age', 18] }
  }
}]
```

---

### ProjectOnlyHelper(...properties)

**Stage:** `Project`  
**Description:** Includes only specified fields (excludes `_id` by default).

**Signature:**
```typescript
ProjectOnlyHelper(...properties: string[]): ProjectStage
```

**Usage Example:**
```typescript
import { ProjectOnlyHelper } from 'mongodb-pipeline-builder/helpers';

builder.Project(ProjectOnlyHelper('name', 'email', 'age')).build();
```

**Result:**
```typescript
[{
  $project: {
    _id: 0,
    name: 1,
    email: 1,
    age: 1
  }
}]
```

**To include `_id`:**
```typescript
builder.Project(ProjectOnlyHelper('_id', 'name', 'email')).build();
```

**Result:**
```typescript
[{
  $project: {
    _id: 1,
    name: 1,
    email: 1
  }
}]
```

---

### ProjectIgnoreHelper(...properties)

**Stage:** `Project`  
**Description:** Excludes specified fields.

**Signature:**
```typescript
ProjectIgnoreHelper(...properties: string[]): ProjectStage
```

**Usage Example:**
```typescript
import { ProjectIgnoreHelper } from 'mongodb-pipeline-builder/helpers';

builder.Project(ProjectIgnoreHelper('password', 'refreshToken', 'internalId')).build();
```

**Result:**
```typescript
[{
  $project: {
    password: 0,
    refreshToken: 0,
    internalId: 0
  }
}]
```

---

## Join Helpers

### LookupEqualityHelper(from, as, localField, foreignField)

**Stage:** `Lookup`  
**Description:** Performs a simple equality join between two collections.

**Signature:**
```typescript
LookupEqualityHelper(
  from: string,
  as: string,
  localField: string,
  foreignField: string
): LookupStage
```

**Parameters:**
- `from`: Collection to join
- `as`: Name of the array field that will contain the results
- `localField`: Field from the local collection
- `foreignField`: Field from the foreign collection

**Usage Example:**
```typescript
import { LookupEqualityHelper } from 'mongodb-pipeline-builder/helpers';

builder.Lookup(LookupEqualityHelper(
  'orders',        // Collection to join
  'userOrders',    // Output field name
  '_id',           // Local field (users._id)
  'userId'         // Foreign field (orders.userId)
)).build();
```

**Result:**
```typescript
[{
  $lookup: {
    from: 'orders',
    localField: '_id',
    foreignField: 'userId',
    as: 'userOrders'
  }
}]
```

**Typical Use Case:**
```typescript
// Get all users with their orders
builder
  .Match(Field('active', true))
  .Lookup(LookupEqualityHelper('orders', 'userOrders', '_id', 'userId'))
  .Project(ProjectOnlyHelper('name', 'email', 'userOrders'))
  .build();
```

---

### LookupConditionHelper(from, as, optional)

**Stage:** `Lookup`  
**Description:** Performs a join with complex conditions and subqueries.

**Signature:**
```typescript
LookupConditionHelper(
  from: string,
  as: string,
  optional?: {
    let?: { [key: string]: any },
    pipeline?: PipelineStage[],
    project?: ProjectStage
  }
): LookupStage
```

**Parameters:**
- `from`: Collection to join
- `as`: Name of the array field that will contain the results
- `optional.let`: Variables to use in the pipeline
- `optional.pipeline`: Aggregation pipeline to apply
- `optional.project`: Projection automatically added to the pipeline

**Example 1 - Lookup with variables:**
```typescript
import { LookupConditionHelper } from 'mongodb-pipeline-builder/helpers';

builder.Lookup(LookupConditionHelper(
  'orders',
  'recentOrders',
  {
    let: { userId: '$_id', minAmount: 100 },
    pipeline: [
      { 
        $match: { 
          $expr: { 
            $and: [
              { $eq: ['$userId', '$$userId'] },
              { $gte: ['$amount', '$$minAmount'] }
            ]
          } 
        } 
      },
      { $sort: { createdAt: -1 } },
      { $limit: 5 }
    ]
  }
)).build();
```

**Result:**
```typescript
[{
  $lookup: {
    from: 'orders',
    let: { userId: '$_id', minAmount: 100 },
    pipeline: [
      { 
        $match: { 
          $expr: { 
            $and: [
              { $eq: ['$userId', '$$userId'] },
              { $gte: ['$amount', '$$minAmount'] }
            ]
          } 
        } 
      },
      { $sort: { createdAt: -1 } },
      { $limit: 5 }
    ],
    as: 'recentOrders'
  }
}]
```

**Example 2 - Lookup with automatic projection:**
```typescript
builder.Lookup(LookupConditionHelper(
  'products',
  'userProducts',
  {
    let: { userId: '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$userId', '$$userId'] } } }
    ],
    project: { name: 1, price: 1, category: 1 }
  }
)).build();
```

**Result:**
```typescript
[{
  $lookup: {
    from: 'products',
    let: { userId: '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
      { $project: { name: 1, price: 1, category: 1 } }
    ],
    as: 'userProducts'
  }
}]
```

---

## Grouping Helpers

### BucketHelper(groupBy, boundaries, optional)

**Stage:** `Bucket`  
**Description:** Categorizes documents into buckets based on defined boundaries.

**Signature:**
```typescript
BucketHelper(
  groupBy: any,
  boundaries: any[],
  optional?: {
    default?: any,
    output?: { [key: string]: any }
  }
): BucketStage
```

**Parameters:**
- `groupBy`: Expression to group documents (often a field with `$`)
- `boundaries`: Array of values defining bucket boundaries (ascending order)
- `optional.default`: Default value for documents outside boundaries
- `optional.output`: Specification of output fields with accumulators

**Example 1 - Grouping by age ranges:**
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

**Result:**
```typescript
[{
  $bucket: {
    groupBy: '$age',
    boundaries: [0, 18, 30, 50, 100],
    default: 'Other',
    output: {
      count: { $sum: 1 },
      users: { $push: '$name' }
    }
  }
}]
```

**Resulting documents:**
```typescript
[
  { _id: 0, count: 5, users: ['Alice', 'Bob', ...] },      // [0, 18)
  { _id: 18, count: 15, users: ['Charlie', ...] },        // [18, 30)
  { _id: 30, count: 20, users: ['David', ...] },          // [30, 50)
  { _id: 50, count: 10, users: ['Eve', ...] },            // [50, 100)
  { _id: 'Other', count: 2, users: ['Unknown1', ...] }    // Outside boundaries
]
```

**Example 2 - Grouping by price ranges:**
```typescript
builder.Bucket(BucketHelper(
  '$price',
  [0, 50, 100, 200, 500],
  {
    default: 'Premium',
    output: {
      count: { $sum: 1 },
      avgPrice: { $avg: '$price' },
      products: { $push: { name: '$name', price: '$price' } }
    }
  }
)).build();
```

**Use Cases:**
- Distribution analysis (ages, prices, scores)
- Automatic categorization
- Histograms
- Data segmentation

---

### BucketAutoHelper(groupBy, buckets, optional)

**Stage:** `BucketAuto`  
**Description:** Automatically categorizes documents into a defined number of buckets with calculated boundaries.

**Signature:**
```typescript
BucketAutoHelper(
  groupBy: any,
  buckets: number,
  optional?: {
    output?: { [key: string]: any },
    granularity?: string
  }
): BucketAutoStage
```

**Parameters:**
- `groupBy`: Expression to group documents
- `buckets`: Number of buckets to create (positive integer)
- `optional.output`: Specification of output fields
- `optional.granularity`: Granularity for boundaries (R5, R10, R20, etc.)

**Usage Example:**
```typescript
import { BucketAutoHelper } from 'mongodb-pipeline-builder/helpers';

builder.BucketAuto(BucketAutoHelper(
  '$price',
  5,
  {
    output: {
      count: { $sum: 1 },
      avgPrice: { $avg: '$price' },
      minPrice: { $min: '$price' },
      maxPrice: { $max: '$price' }
    }
  }
)).build();
```

**Result:**
```typescript
[{
  $bucketAuto: {
    groupBy: '$price',
    buckets: 5,
    output: {
      count: { $sum: 1 },
      avgPrice: { $avg: '$price' },
      minPrice: { $min: '$price' },
      maxPrice: { $max: '$price' }
    }
  }
}]
```

**Difference with Bucket:**
- `Bucket`: You define boundaries manually
- `BucketAuto`: MongoDB automatically calculates boundaries to distribute evenly

**Use Cases:**
- Automatic data distribution
- Exploratory analysis without knowing boundaries
- Group balancing

---

## Output Helpers

### OutHelper(collection, optional)

**Stage:** `Out`  
**Description:** Writes results to a collection (replaces existing collection).

**Signature:**
```typescript
OutHelper(
  collection: string,
  optional?: {
    db?: string
  }
): OutStage
```

**Parameters:**
- `collection`: Name of output collection
- `optional.db`: Database name (optional, same DB by default)

**Example 1 - Simple output:**
```typescript
import { OutHelper } from 'mongodb-pipeline-builder/helpers';

builder
  .Match(Field('status', 'active'))
  .Project(ProjectOnlyHelper('name', 'email'))
  .Out(OutHelper('activeUsers'))
  .build();
```

**Result:**
```typescript
[
  { $match: { status: 'active' } },
  { $project: { _id: 0, name: 1, email: 1 } },
  { $out: 'activeUsers' }
]
```

**Example 2 - Output to another database:**
```typescript
builder
  .Group({ _id: '$category', total: { $sum: '$amount' } })
  .Out(OutHelper('categorySummary', { db: 'analytics' }))
  .build();
```

**Result:**
```typescript
[
  { $group: { _id: '$category', total: { $sum: '$amount' } } },
  { $out: { db: 'analytics', coll: 'categorySummary' } }
]
```

**⚠️ Warnings:**
- Completely replaces existing collection
- Must be the last stage of the pipeline
- Can appear only once

---

### MergeHelper(into, optional)

**Stage:** `Merge`  
**Description:** Merges results into a collection (upsert/merge).

**Signature:**
```typescript
MergeHelper(
  into: string | { db: string, coll: string },
  optional?: {
    on?: string | string[],
    let?: { [key: string]: any },
    whenMatched?: 'replace' | 'keepExisting' | 'merge' | 'fail' | any[],
    whenNotMatched?: 'insert' | 'discard' | 'fail'
  }
): MergeStage
```

**Parameters:**
- `into`: Destination collection (string or object with db/coll)
- `optional.on`: Field(s) used to identify documents
- `optional.whenMatched`: Action if document exists
- `optional.whenNotMatched`: Action if document doesn't exist

**Example 1 - Simple merge (upsert):**
```typescript
import { MergeHelper } from 'mongodb-pipeline-builder/helpers';

builder
  .Group({ _id: '$userId', totalSpent: { $sum: '$amount' } })
  .Merge(MergeHelper(
    'userStats',
    {
      on: '_id',
      whenMatched: 'merge',
      whenNotMatched: 'insert'
    }
  ))
  .build();
```

**Result:**
```typescript
[
  { $group: { _id: '$userId', totalSpent: { $sum: '$amount' } } },
  {
    $merge: {
      into: 'userStats',
      on: '_id',
      whenMatched: 'merge',
      whenNotMatched: 'insert'
    }
  }
]
```

**Example 2 - Merge with custom pipeline:**
```typescript
builder
  .Match(Field('active', true))
  .Merge(MergeHelper(
    { db: 'backup', coll: 'activeUsers' },
    {
      on: '_id',
      whenMatched: [
        { $set: { lastUpdated: new Date() } }
      ],
      whenNotMatched: 'insert'
    }
  ))
  .build();
```

**whenMatched options:**
- `'replace'`: Replace entire document
- `'merge'`: Merge fields
- `'keepExisting'`: Keep existing document
- `'fail'`: Fail if document exists
- `Pipeline[]`: Custom pipeline to execute

**whenNotMatched options:**
- `'insert'`: Insert new document
- `'discard'`: Ignore document
- `'fail'`: Fail if document doesn't exist

**Difference with Out:**
- `Out`: Replaces entire collection
- `Merge`: Upsert/merge document by document

---

## Search Helpers

### SearchHelper(operator, optional)

**Stage:** `Search`  
**Description:** Performs full-text search with Atlas Search.

**Signature:**
```typescript
SearchHelper(
  operator: SearchStageOperators,
  optional?: SearchStageFields
): SearchStage
```

**Example 1 - Simple text search:**
```typescript
import { SearchHelper } from 'mongodb-pipeline-builder/helpers';

builder.Search(SearchHelper({
  text: {
    query: 'mongodb database',
    path: ['title', 'description']
  }
})).build();
```

**Result:**
```typescript
[{
  $search: {
    text: {
      query: 'mongodb database',
      path: ['title', 'description']
    }
  }
}]
```

**Example 2 - Search with specific index:**
```typescript
builder.Search(SearchHelper(
  {
    compound: {
      must: [
        { text: { query: 'mongodb', path: 'title' } }
      ],
      should: [
        { text: { query: 'aggregation', path: 'content' } }
      ]
    }
  },
  {
    index: 'default',
    highlight: { path: 'title' }
  }
)).build();
```

**Result:**
```typescript
[{
  $search: {
    index: 'default',
    compound: {
      must: [{ text: { query: 'mongodb', path: 'title' } }],
      should: [{ text: { query: 'aggregation', path: 'content' } }]
    },
    highlight: { path: 'title' }
  }
}]
```

**Use Cases:**
- Full-text search
- Fuzzy search
- Autocomplete
- Faceted search

---

### SearchMetaHelper(operator, optional)

**Stage:** `SearchMeta`  
**Description:** Returns only search metadata (no documents).

**Signature:**
```typescript
SearchMetaHelper(
  operator: SearchMetaOperators,
  optional?: SearchMetaFields
): SearchMetaStage
```

**Example - Get search facets:**
```typescript
import { SearchMetaHelper } from 'mongodb-pipeline-builder/helpers';

builder.SearchMeta(SearchMetaHelper({
  facet: {
    operator: {
      text: {
        query: 'mongodb',
        path: 'description'
      }
    },
    facets: {
      categoryFacet: {
        type: 'string',
        path: 'category'
      },
      priceFacet: {
        type: 'number',
        path: 'price',
        boundaries: [0, 50, 100, 500]
      }
    }
  }
})).build();
```

**Result:**
```typescript
[{
  $searchMeta: {
    facet: {
      operator: {
        text: { query: 'mongodb', path: 'description' }
      },
      facets: {
        categoryFacet: { type: 'string', path: 'category' },
        priceFacet: { type: 'number', path: 'price', boundaries: [0, 50, 100, 500] }
      }
    }
  }
}]
```

**Use Cases:**
- Get search statistics
- Build faceted filters
- Search analysis

---

## Geospatial Helpers

### GeoNearHelper(near, distanceField, optional)

**Stage:** `GeoNear`  
**Description:** Finds documents near a geographic point.

**Signature:**
```typescript
GeoNearHelper(
  near: { type: 'Point', coordinates: [number, number] },
  distanceField: string,
  optional?: {
    maxDistance?: number,
    minDistance?: number,
    spherical?: boolean,
    query?: any,
    distanceMultiplier?: number,
    includeLocs?: string,
    key?: string
  }
): GeoNearStage
```

**Parameters:**
- `near`: Reference point (GeoJSON format)
- `distanceField`: Name of field that will contain calculated distance
- `optional.maxDistance`: Maximum distance in meters
- `optional.spherical`: Use spherical calculation (recommended for Earth)
- `optional.query`: Additional filter

**Example 1 - Find nearby restaurants:**
```typescript
import { GeoNearHelper } from 'mongodb-pipeline-builder/helpers';

builder.GeoNear(GeoNearHelper(
  { type: 'Point', coordinates: [-73.99279, 40.719296] },  // [longitude, latitude]
  'distance',
  {
    maxDistance: 5000,    // 5 km
    spherical: true,
    query: { type: 'restaurant', rating: { $gte: 4 } }
  }
)).build();
```

**Result:**
```typescript
[{
  $geoNear: {
    near: { type: 'Point', coordinates: [-73.99279, 40.719296] },
    distanceField: 'distance',
    maxDistance: 5000,
    spherical: true,
    query: { type: 'restaurant', rating: { $gte: 4 } }
  }
}]
```

**Example 2 - With distance in kilometers:**
```typescript
builder.GeoNear(GeoNearHelper(
  { type: 'Point', coordinates: [2.3522, 48.8566] },  // Paris
  'distanceKm',
  {
    maxDistance: 10000,           // 10 km in meters
    spherical: true,
    distanceMultiplier: 0.001     // Convert meters to kilometers
  }
)).build();
```

**⚠️ Constraints:**
- Must be the first stage of the pipeline
- Can appear only once
- Requires a geospatial index (2dsphere)

---

## Time Series Helpers

### DensifyHelper(field, range, optional)

**Stage:** `Densify`  
**Description:** Fills gaps in time series or numeric data.

**Signature:**
```typescript
DensifyHelper(
  field: string,
  range: {
    bounds: 'full' | 'partition' | [any, any],
    step: number,
    unit?: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'
  },
  optional?: {
    partitionByFields?: string[]
  }
): DensifyStage
```

**Parameters:**
- `field`: Field to densify
- `range.bounds`: Boundaries (`'full'`, `'partition'`, or array `[min, max]`)
- `range.step`: Step between each value
- `range.unit`: Time unit (for dates)
- `optional.partitionByFields`: Partition fields

**Example 1 - Fill missing hours:**
```typescript
import { DensifyHelper } from 'mongodb-pipeline-builder/helpers';

builder.Densify(DensifyHelper(
  'timestamp',
  {
    bounds: 'full',
    step: 1,
    unit: 'hour'
  }
)).build();
```

**Result:**
```typescript
[{
  $densify: {
    field: 'timestamp',
    range: {
      bounds: 'full',
      step: 1,
      unit: 'hour'
    }
  }
}]
```

**Example 2 - By sensor with partition:**
```typescript
builder.Densify(DensifyHelper(
  'timestamp',
  {
    bounds: 'partition',
    step: 15,
    unit: 'minute'
  },
  {
    partitionByFields: ['sensorId']
  }
)).build();
```

**Result:**
```typescript
[{
  $densify: {
    field: 'timestamp',
    range: {
      bounds: 'partition',
      step: 15,
      unit: 'minute'
    },
    partitionByFields: ['sensorId']
  }
}]
```

**Use Cases:**
- IoT data with missing measurements
- Incomplete time series
- Charts with all time points

---

### FillHelper(output, optional)

**Stage:** `Fill`  
**Description:** Fills missing values in fields.

**Signature:**
```typescript
FillHelper(
  output: {
    [field: string]: {
      value?: any,
      method?: 'locf' | 'linear'
    }
  },
  optional?: {
    sortBy?: { [field: string]: 1 | -1 },
    partitionBy?: any,
    partitionByFields?: string[]
  }
): FillStage
```

**Parameters:**
- `output`: Specification of fields to fill
  - `value`: Fixed fill value
  - `method`: Interpolation method (`'locf'` = last observation carried forward, `'linear'`)
- `optional.sortBy`: Sort order for interpolation
- `optional.partitionBy`: Partition expression

**Example 1 - Fill with fixed value:**
```typescript
import { FillHelper } from 'mongodb-pipeline-builder/helpers';

builder.Fill(FillHelper({
  status: { value: 'unknown' },
  priority: { value: 0 }
})).build();
```

**Result:**
```typescript
[{
  $fill: {
    output: {
      status: { value: 'unknown' },
      priority: { value: 0 }
    }
  }
}]
```

**Example 2 - Linear interpolation:**
```typescript
builder.Fill(FillHelper(
  {
    temperature: { method: 'linear' },
    humidity: { method: 'locf' }
  },
  {
    sortBy: { timestamp: 1 },
    partitionByFields: ['sensorId']
  }
)).build();
```

**Result:**
```typescript
[{
  $fill: {
    output: {
      temperature: { method: 'linear' },
      humidity: { method: 'locf' }
    },
    sortBy: { timestamp: 1 },
    partitionByFields: ['sensorId']
  }
}]
```

**Fill methods:**
- `value`: Constant value
- `locf`: Last observed value
- `linear`: Linear interpolation between values

---

## Streaming Helpers

### ChangeStreamHelper(optional)

**Stage:** `ChangeStream`  
**Description:** Monitors real-time changes on a collection.

**Signature:**
```typescript
ChangeStreamHelper(
  optional?: {
    fullDocument?: 'default' | 'updateLookup' | 'whenAvailable' | 'required',
    fullDocumentBeforeChange?: 'off' | 'whenAvailable' | 'required',
    resumeAfter?: any,
    startAfter?: any,
    startAtOperationTime?: Date,
    showExpandedEvents?: boolean
  }
): ChangeStreamStage
```

**Parameters:**
- `fullDocument`: Include full document after modification
- `fullDocumentBeforeChange`: Include document before modification
- `resumeAfter`: Resume after a specific token
- `startAtOperationTime`: Start at a timestamp

**Example 1 - Simple monitoring:**
```typescript
import { ChangeStreamHelper } from 'mongodb-pipeline-builder/helpers';

builder.ChangeStream(ChangeStreamHelper({
  fullDocument: 'updateLookup'
})).build();
```

**Result:**
```typescript
[{
  $changeStream: {
    fullDocument: 'updateLookup'
  }
}]
```

**Example 2 - Complete monitoring (before/after):**
```typescript
builder.ChangeStream(ChangeStreamHelper({
  fullDocument: 'updateLookup',
  fullDocumentBeforeChange: 'whenAvailable',
  showExpandedEvents: true
})).build();
```

**Result:**
```typescript
[{
  $changeStream: {
    fullDocument: 'updateLookup',
    fullDocumentBeforeChange: 'whenAvailable',
    showExpandedEvents: true
  }
}]
```

**fullDocument options:**
- `'default'`: No full document (update deltas only)
- `'updateLookup'`: Fetch document after update
- `'whenAvailable'`: Include if available
- `'required'`: Fail if not available

**Use Cases:**
- Real-time synchronization
- Audit trail
- Application triggers
- Cache invalidation

---

## Utility Helpers

### SampleHelper(size)

**Stage:** `Sample`  
**Description:** Randomly selects a specified number of documents.

**Signature:**
```typescript
SampleHelper(size: number): SampleStage
```

**Parameter:**
- `size`: Number of documents to sample (positive integer)

**Usage Example:**
```typescript
import { SampleHelper } from 'mongodb-pipeline-builder/helpers';

builder.Sample(SampleHelper(100)).build();
```

**Result:**
```typescript
[{
  $sample: { size: 100 }
}]
```

**Use Cases:**
- Testing with random data
- Statistical sampling
- Random recommendations
- Surveys

---

### UnionWithHelper(coll, pipeline)

**Stage:** `UnionWith`  
**Description:** Combines documents from multiple collections.

**Signature:**
```typescript
UnionWithHelper(
  coll?: string,
  pipeline?: PipelineStage[]
): UnionWithStage
```

**Parameters:**
- `coll`: Collection to union (optional if pipeline provided)
- `pipeline`: Pipeline to apply (optional)

**Example 1 - Simple union:**
```typescript
import { UnionWithHelper } from 'mongodb-pipeline-builder/helpers';

builder
  .Match(Field('status', 'active'))
  .UnionWith(UnionWithHelper('archivedUsers'))
  .build();
```

**Result:**
```typescript
[
  { $match: { status: 'active' } },
  { $unionWith: { coll: 'archivedUsers' } }
]
```

**Example 2 - Union with filter:**
```typescript
builder
  .Match(Field('year', 2024))
  .UnionWith(UnionWithHelper(
    'orders2023',
    [{ $match: { status: 'completed' } }]
  ))
  .build();
```

**Result:**
```typescript
[
  { $match: { year: 2024 } },
  {
    $unionWith: {
      coll: 'orders2023',
      pipeline: [{ $match: { status: 'completed' } }]
    }
  }
]
```

**Example 3 - Union with inline documents:**
```typescript
builder.UnionWith(UnionWithHelper(
  undefined,
  [{ 
    $documents: [
      { _id: 1, name: 'John' },
      { _id: 2, name: 'Jane' }
    ] 
  }]
)).build();
```

**Use Cases:**
- Combine current and archived data
- Union of sharded collections
- Multi-collection aggregation
- Inline test data

---

### CollStatsHelper(optional)

**Stage:** `CollStats`  
**Description:** Returns collection statistics.

**Signature:**
```typescript
CollStatsHelper(
  optional?: {
    latencyStats?: { histograms?: boolean },
    storageStats?: { scale?: number },
    count?: {},
    queryExecStats?: boolean
  }
): CollStatsStage
```

**Usage Example:**
```typescript
import { CollStatsHelper } from 'mongodb-pipeline-builder/helpers';

builder.CollStats(CollStatsHelper({
  latencyStats: { histograms: true },
  storageStats: { scale: 1024 },  // Size in KB
  count: {}
})).build();
```

**Result:**
```typescript
[{
  $collStats: {
    latencyStats: { histograms: true },
    storageStats: { scale: 1024 },
    count: {}
  }
}]
```

**Use Cases:**
- Performance monitoring
- Collection size analysis
- Index statistics

---

### CurrentOpHelper(optional)

**Stage:** `CurrentOp`  
**Description:** Returns information about current operations.

**Signature:**
```typescript
CurrentOpHelper(
  optional?: {
    allUsers?: boolean,
    idleConnections?: boolean,
    idleCursors?: boolean,
    idleSessions?: boolean,
    localOps?: boolean
  }
): CurrentOpStage
```

**Usage Example:**
```typescript
import { CurrentOpHelper } from 'mongodb-pipeline-builder/helpers';

builder.CurrentOp(CurrentOpHelper({
  allUsers: true,
  idleConnections: false
})).build();
```

**Result:**
```typescript
[{
  $currentOp: {
    allUsers: true,
    idleConnections: false
  }
}]
```

**Use Cases:**
- Operation monitoring
- Slow query detection
- Database administration

---

### Base Utility Helpers

#### setDefaultValueIfNotProvided(defaultValue, value)

**Description:** Sets a default value if the provided value is not provided.

**Signature:**
```typescript
setDefaultValueIfNotProvided<T>(defaultValue: T, value?: T): T
```

**Example:**
```typescript
import { setDefaultValueIfNotProvided } from 'mongodb-pipeline-builder/helpers';

const limit = setDefaultValueIfNotProvided(10, undefined);  // 10
const page = setDefaultValueIfNotProvided(1, 5);            // 5
```

---

#### isEmptyObject(obj)

**Description:** Checks if an object is empty.

**Signature:**
```typescript
isEmptyObject(obj: object): boolean
```

**Example:**
```typescript
import { isEmptyObject } from 'mongodb-pipeline-builder/helpers';

isEmptyObject({});              // true
isEmptyObject({ name: 'test' }); // false
```

---

#### isNotEmptyObject(obj)

**Description:** Checks if an object is not empty.

**Signature:**
```typescript
isNotEmptyObject(obj?: object): boolean
```

**Example:**
```typescript
import { isNotEmptyObject } from 'mongodb-pipeline-builder/helpers';

isNotEmptyObject({});              // false
isNotEmptyObject({ name: 'test' }); // true
isNotEmptyObject(undefined);       // false
```

---

## Summary Table

### Helpers by Stage

| Helper | Stage | Primary Usage |
|--------|-------|---------------|
| `Field` | Multiple | Universal key-value field creation |
| `List` | Multiple | List/array creation |
| `ProjectHelper` | `Project` | Custom projection |
| `ProjectOnlyHelper` | `Project` | Include only certain fields |
| `ProjectIgnoreHelper` | `Project` | Exclude certain fields |
| `LookupEqualityHelper` | `Lookup` | Simple equality join |
| `LookupConditionHelper` | `Lookup` | Join with complex conditions |
| `BucketHelper` | `Bucket` | Categorization with defined boundaries |
| `BucketAutoHelper` | `BucketAuto` | Automatic categorization |
| `OutHelper` | `Out` | Write to collection (replace) |
| `MergeHelper` | `Merge` | Merge into collection (upsert) |
| `SearchHelper` | `Search` | Atlas full-text search |
| `SearchMetaHelper` | `SearchMeta` | Search metadata |
| `GeoNearHelper` | `GeoNear` | Geospatial search |
| `DensifyHelper` | `Densify` | Fill time gaps |
| `FillHelper` | `Fill` | Fill missing values |
| `ChangeStreamHelper` | `ChangeStream` | Monitor changes |
| `SampleHelper` | `Sample` | Random sampling |
| `UnionWithHelper` | `UnionWith` | Union collections |
| `CollStatsHelper` | `CollStats` | Collection statistics |
| `CurrentOpHelper` | `CurrentOp` | Current operations |

---

### Helpers by Category

#### 🔧 Universal Helpers
- `Field` - Field creation
- `List` - List creation

#### 📊 Projection Helpers
- `ProjectHelper` - Custom projection
- `ProjectOnlyHelper` - Selective inclusion
- `ProjectIgnoreHelper` - Selective exclusion

#### 🔗 Join Helpers
- `LookupEqualityHelper` - Simple join
- `LookupConditionHelper` - Complex join

#### 📦 Grouping Helpers
- `BucketHelper` - Manual buckets
- `BucketAutoHelper` - Automatic buckets

#### 💾 Output Helpers
- `OutHelper` - Complete write
- `MergeHelper` - Merge/Upsert

#### 🔍 Search Helpers
- `SearchHelper` - Full-text search
- `SearchMetaHelper` - Search metadata
- `GeoNearHelper` - Geospatial search

#### ⏱️ Time Series Helpers
- `DensifyHelper` - Time filling
- `FillHelper` - Value filling

#### 🔄 Streaming Helpers
- `ChangeStreamHelper` - Change streams

#### 🛠️ Utility Helpers
- `SampleHelper` - Sampling
- `UnionWithHelper` - Union collections
- `CollStatsHelper` - Statistics
- `CurrentOpHelper` - Current operations

---

## Combined Usage Examples

### Example 1: Complete E-Commerce Pipeline

```typescript
import { 
  Field, 
  LookupEqualityHelper, 
  ProjectOnlyHelper,
  BucketHelper 
} from 'mongodb-pipeline-builder/helpers';

const pipeline = builder
  // Filter orders from last month
  .Match(Field('createdAt', { 
    $gte: new Date('2024-01-01') 
  }))
  
  // Join with users collection
  .Lookup(LookupEqualityHelper(
    'users',
    'userInfo',
    'userId',
    '_id'
  ))
  
  // Unwind userInfo array
  .Unwind({ path: '$userInfo' })
  
  // Project only needed fields
  .Project(ProjectOnlyHelper(
    'orderId',
    'amount',
    'userInfo.name',
    'userInfo.email'
  ))
  
  // Group by amount ranges
  .Bucket(BucketHelper(
    '$amount',
    [0, 50, 100, 200, 500],
    {
      default: 'Premium',
      output: {
        count: { $sum: 1 },
        avgAmount: { $avg: '$amount' },
        orders: { $push: '$$ROOT' }
      }
    }
  ))
  
  .build();
```

---

### Example 2: IoT Time Series Pipeline

```typescript
import { 
  Field,
  DensifyHelper,
  FillHelper,
  ProjectIgnoreHelper 
} from 'mongodb-pipeline-builder/helpers';

const pipeline = builder
  // Filter by sensor and period
  .Match(Field('sensorId', 'SENSOR_001'))
  
  // Fill missing timestamps
  .Densify(DensifyHelper(
    'timestamp',
    {
      bounds: 'full',
      step: 5,
      unit: 'minute'
    }
  ))
  
  // Interpolate missing values
  .Fill(FillHelper(
    {
      temperature: { method: 'linear' },
      humidity: { method: 'locf' }
    },
    {
      sortBy: { timestamp: 1 }
    }
  ))
  
  // Calculate metrics
  .AddFields(
    Field('tempCelsius', { 
      $subtract: [{ $multiply: ['$temperature', 9/5] }, 32] 
    })
  )
  
  // Remove internal fields
  .Project(ProjectIgnoreHelper('_internalId', '_version'))
  
  .build();
```

---

### Example 3: Geospatial Search Pipeline

```typescript
import { 
  GeoNearHelper,
  LookupConditionHelper,
  ProjectOnlyHelper 
} from 'mongodb-pipeline-builder/helpers';

const pipeline = builder
  // Find nearby restaurants
  .GeoNear(GeoNearHelper(
    { 
      type: 'Point', 
      coordinates: [-73.99279, 40.719296] 
    },
    'distance',
    {
      maxDistance: 5000,
      spherical: true,
      query: { 
        type: 'restaurant',
        rating: { $gte: 4 }
      }
    }
  ))
  
  // Join with reviews
  .Lookup(LookupConditionHelper(
    'reviews',
    'recentReviews',
    {
      let: { restaurantId: '$_id' },
      pipeline: [
        { 
          $match: { 
            $expr: { $eq: ['$restaurantId', '$$restaurantId'] } 
          } 
        },
        { $sort: { createdAt: -1 } },
        { $limit: 5 }
      ],
      project: { comment: 1, rating: 1, createdAt: 1 }
    }
  ))
  
  // Project useful fields
  .Project(ProjectOnlyHelper(
    'name',
    'address',
    'distance',
    'rating',
    'recentReviews'
  ))
  
  // Limit results
  .Limit(20)
  
  .build();
```

---

## Best Practices

### 1. Always import necessary helpers

```typescript
// ✅ Good
import { Field, ProjectOnlyHelper } from 'mongodb-pipeline-builder/helpers';

// ❌ Avoid importing everything
import * as helpers from 'mongodb-pipeline-builder/helpers';
```

### 2. Use appropriate helpers

```typescript
// ✅ Good - Use specific helper
builder.Lookup(LookupEqualityHelper('orders', 'userOrders', '_id', 'userId'))

// ❌ Avoid - Manual construction
builder.Lookup({ from: 'orders', localField: '_id', foreignField: 'userId', as: 'userOrders' })
```

### 3. Combine helpers for clarity

```typescript
// ✅ Good - Combined helpers
builder
  .Match(Field('status', 'active'))
  .Project(ProjectOnlyHelper('name', 'email'))
  .Sort(Field('createdAt', -1))
  .Limit(10)

// ❌ Avoid - Mixed styles
builder
  .Match({ status: 'active' })
  .Project(ProjectOnlyHelper('name', 'email'))
  .Sort({ createdAt: -1 })
  .Limit(10)
```

### 4. Document complex pipelines

```typescript
const pipeline = builder
  // Step 1: Filter active users
  .Match(Field('active', true))
  
  // Step 2: Enrich with orders
  .Lookup(LookupEqualityHelper('orders', 'userOrders', '_id', 'userId'))
  
  // Step 3: Calculate statistics
  .AddFields(
    Field('totalOrders', { $size: '$userOrders' }),
    Field('totalSpent', { $sum: '$userOrders.amount' })
  )
  
  .build();
```

---

## Related Documentation

- [Getting Started Guide](../getting-started.md)
- [Stages Reference](./stages.md)
- [Operators Reference](./operators.md)
- [Lookup Examples](../examples/lookups.md)
- [Pagination Examples](../examples/pagination.md)

