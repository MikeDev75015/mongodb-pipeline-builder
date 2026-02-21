# API Reference

Complete API documentation for MongoDB Pipeline Builder.

## Table of Contents

### 📦 [Stages](./stages.md)
Complete documentation of all supported MongoDB aggregation stages.

**Included categories:**
- Custom Stages (Paging, Insert)
- Data Transformation (AddFields, Set, Project, etc.)
- Filtering & Matching (Match, Redact)
- Sorting & Limiting (Sort, Limit, Skip, Sample)
- Grouping & Aggregation (Group, Bucket, BucketAuto, Count, etc.)
- Joining Collections (Lookup, GraphLookup, UnionWith)
- Output Stages (Out, Merge)
- Search & Text (Search, SearchMeta, GeoNear)
- Stream Processing (ChangeStream)
- Utility Stages (Facet, Documents, Densify, Fill, etc.)

---

### 🔧 [Helpers](./helpers.md)
Documentation of all utility helpers to facilitate pipeline construction.

**Included categories:**
- Universal Helpers (Field, List)
- Projection Helpers (ProjectHelper, ProjectOnlyHelper, ProjectIgnoreHelper)
- Join Helpers (LookupEqualityHelper, LookupConditionHelper)
- Grouping Helpers (BucketHelper, BucketAutoHelper)
- Output Helpers (OutHelper, MergeHelper)
- Search Helpers (SearchHelper, SearchMetaHelper, GeoNearHelper)
- Time Series Helpers (DensifyHelper, FillHelper)
- Streaming Helpers (ChangeStreamHelper)
- Utility Helpers (SampleHelper, UnionWithHelper, CollStatsHelper, CurrentOpHelper)

**Each helper includes:**
- Complete TypeScript signature
- Associated stage(s)
- Practical usage examples
- Typical use cases

---

### ⚙️ [Operators](./operators.md)
Complete documentation of all MongoDB aggregation operators.

**Included categories:**
- Accumulator Operators ($sum, $avg, $min, $max, etc.)
- Arithmetic Operators ($add, $subtract, $multiply, $divide, etc.)
- Array Operators ($arrayElemAt, $arrayToObject, $filter, $map, etc.)
- Boolean Operators ($and, $or, $not)
- Comparison Operators ($eq, $gt, $gte, $lt, $lte, $ne)
- Conditional Operators ($cond, $ifNull, $switch)
- Date Operators ($dateAdd, $dateSubtract, $dateToString, etc.)
- String Operators ($concat, $split, $substr, $toLower, $toUpper, etc.)
- Set Operators ($setIntersection, $setUnion, $setDifference)
- Type Operators ($type, $isNumber, $isArray, etc.)
- And many more...

---

## Navigation Guide

### By Use Case

#### 🔍 Filtering and Search
- **Stages:** [Match](./stages.md#match), [Redact](./stages.md#redact), [Search](./stages.md#search)
- **Operators:** [$eq](./operators.md#equal), [$gt](./operators.md#greaterthan), [$in](./operators.md#in)
- **Helpers:** [Field](./helpers.md#field)

#### 🔗 Collection Joins
- **Stages:** [Lookup](./stages.md#lookup), [GraphLookup](./stages.md#graphlookup), [UnionWith](./stages.md#unionwith)
- **Helpers:** [LookupEqualityHelper](./helpers.md#lookupequalityhelper), [LookupConditionHelper](./helpers.md#lookupconditionhelper), [UnionWithHelper](./helpers.md#unionwithhelper)

#### 📊 Data Transformation
- **Stages:** [AddFields](./stages.md#addfields), [Set](./stages.md#set), [Project](./stages.md#project), [Unwind](./stages.md#unwind)
- **Operators:** [$concat](./operators.md#concat), [$multiply](./operators.md#multiply), [$map](./operators.md#map)
- **Helpers:** [ProjectOnlyHelper](./helpers.md#projectonlyhelper), [ProjectIgnoreHelper](./helpers.md#projectignorehelper), [Field](./helpers.md#field)

#### 📈 Aggregation and Grouping
- **Stages:** [Group](./stages.md#group), [Bucket](./stages.md#bucket), [BucketAuto](./stages.md#bucketauto), [Count](./stages.md#count)
- **Operators:** [$sum](./operators.md#sum), [$avg](./operators.md#average), [$min](./operators.md#min), [$max](./operators.md#max)
- **Helpers:** [BucketHelper](./helpers.md#buckethelper), [BucketAutoHelper](./helpers.md#bucketautohelper)

#### 🗺️ Geospatial Data
- **Stages:** [GeoNear](./stages.md#geonear)
- **Helpers:** [GeoNearHelper](./helpers.md#geonearhelper)

#### ⏱️ Time Series
- **Stages:** [Densify](./stages.md#densify), [Fill](./stages.md#fill), [SetWindowFields](./stages.md#setwindowfields)
- **Helpers:** [DensifyHelper](./helpers.md#densifyhelper), [FillHelper](./helpers.md#fillhelper)

#### 💾 Data Output
- **Stages:** [Out](./stages.md#out), [Merge](./stages.md#merge)
- **Helpers:** [OutHelper](./helpers.md#outhelper), [MergeHelper](./helpers.md#mergehelper)

#### 📄 Pagination
- **Stages:** [Paging](./stages.md#paging), [Limit](./stages.md#limit), [Skip](./stages.md#skip)
- **Methods:** `GetPagingResult()`

---

## Naming Conventions

### Operators
All operators are prefixed with `$`:
```typescript
import { $Add, $Multiply, $Concat } from 'mongodb-pipeline-builder/operators';
```

### Helpers
All helpers are suffixed with `Helper` (except Field and List):
```typescript
import { 
  Field,                    // Universal helper
  ProjectOnlyHelper,        // Projection helper
  LookupEqualityHelper,     // Join helper
  BucketHelper             // Grouping helper
} from 'mongodb-pipeline-builder/helpers';
```

### Stages
Stages use PascalCase:
```typescript
builder
  .Match(...)
  .Project(...)
  .Group(...)
  .Sort(...)
```

---

## Complete Examples

### Simple Pipeline
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { Field, ProjectOnlyHelper } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('simple-query')
  .Match(Field('status', 'active'))
  .Project(ProjectOnlyHelper('name', 'email'))
  .Sort(Field('createdAt', -1))
  .Limit(10)
  .build();
```

### Pipeline with Join
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { LookupEqualityHelper, Field } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('users-with-orders')
  .Match(Field('active', true))
  .Lookup(LookupEqualityHelper('orders', 'userOrders', '_id', 'userId'))
  .Unwind({ path: '$userOrders' })
  .Group({
    _id: '$_id',
    name: { $first: '$name' },
    totalOrders: { $sum: 1 }
  })
  .build();
```

### Pipeline with Aggregation
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { BucketHelper } from 'mongodb-pipeline-builder/helpers';
import { $Sum, $Avg } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('sales-analysis')
  .Match({ year: 2024 })
  .Bucket(BucketHelper(
    '$amount',
    [0, 100, 500, 1000, 5000],
    {
      default: 'High',
      output: {
        count: $Sum(1),
        avgAmount: $Avg('$amount')
      }
    }
  ))
  .build();
```

---

## Additional Resources

- 📖 [Getting Started Guide](../getting-started.md)
- 📖 [Migration Guide v3 → v4](../migration-guide.md)
- 💡 [Pagination Examples](../examples/pagination.md)
- 💡 [Lookup Examples](../examples/lookups.md)
- 🌐 [Official MongoDB Documentation](https://docs.mongodb.com/manual/aggregation/)


