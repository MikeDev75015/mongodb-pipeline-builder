# MongoDB Pipeline Builder Documentation

Welcome to the complete documentation for MongoDB Pipeline Builder - a type-safe TypeScript library for building MongoDB aggregation pipelines.

## 🚀 Quick Start

### [Getting Started Guide](./getting-started.md)
Complete guide to get started with MongoDB Pipeline Builder:
- Installation and configuration
- Basic concepts
- First pipelines
- Simple and advanced examples
- Best practices

**Ideal for:** New users and those discovering the library.

---

### [Migration Guide v3 → v4](./migration-guide.md)
Detailed guide to migrate from version 3 to version 4:
- Breaking changes
- New features
- Migration examples
- Migration checklist

**Ideal for:** Existing users who want to upgrade to v4.

---

## 📚 API Reference

### [Complete Reference](./api/README.md)
Main index of all API documentation with navigation by use case.

### [Aggregation Stages](./api/stages.md)
Complete documentation of all supported MongoDB stages:
- `Match`, `Project`, `Group`, `Sort`, `Limit`, `Skip`
- `Lookup`, `GraphLookup`, `UnionWith`
- `Bucket`, `BucketAuto`, `Facet`
- `AddFields`, `Set`, `Unset`, `ReplaceRoot`
- `GeoNear`, `Search`, `SearchMeta`
- `ChangeStream`, `Densify`, `Fill`
- And 40+ other stages...

**Each stage includes:**
- Description and usage
- Detailed parameters
- Concrete examples
- Use cases
- Links to associated helpers

---

### [Operators](./api/operators.md)
Documentation of all MongoDB aggregation operators:
- **Accumulators:** `$sum`, `$avg`, `$min`, `$max`, `$push`, `$addToSet`
- **Arithmetic:** `$add`, `$subtract`, `$multiply`, `$divide`, `$mod`
- **Arrays:** `$arrayElemAt`, `$filter`, `$map`, `$reduce`, `$slice`
- **Boolean:** `$and`, `$or`, `$not`
- **Comparison:** `$eq`, `$gt`, `$gte`, `$lt`, `$lte`, `$ne`, `$in`
- **Conditional:** `$cond`, `$ifNull`, `$switch`
- **Date:** `$dateAdd`, `$dateSubtract`, `$dateToString`, `$dayOfMonth`
- **String:** `$concat`, `$split`, `$substr`, `$toLower`, `$toUpper`
- **Sets:** `$setIntersection`, `$setUnion`, `$setDifference`
- **Types:** `$type`, `$isNumber`, `$isArray`, `$convert`
- And 150+ other operators...

---

### [Helpers](./api/helpers.md)
Documentation of all utility helpers:

#### Universal Helpers
- `Field(name, value)` - Create key-value fields
- `List(...args)` - Create lists/arrays

#### Projection Helpers
- `ProjectHelper(field, value)` - Custom projection
- `ProjectOnlyHelper(...fields)` - Include only certain fields
- `ProjectIgnoreHelper(...fields)` - Exclude certain fields

#### Join Helpers
- `LookupEqualityHelper(from, as, local, foreign)` - Simple join
- `LookupConditionHelper(from, as, options)` - Complex join

#### Grouping Helpers
- `BucketHelper(groupBy, boundaries, options)` - Manual buckets
- `BucketAutoHelper(groupBy, buckets, options)` - Automatic buckets

#### Output Helpers
- `OutHelper(collection, options)` - Complete write
- `MergeHelper(into, options)` - Merge/Upsert

#### Search Helpers
- `SearchHelper(operator, options)` - Full-text search
- `SearchMetaHelper(operator, options)` - Search metadata
- `GeoNearHelper(near, distanceField, options)` - Geospatial search

#### Time Series Helpers
- `DensifyHelper(field, range, options)` - Time filling
- `FillHelper(output, options)` - Value filling

#### Other Helpers
- `ChangeStreamHelper(options)` - Change streams
- `SampleHelper(size)` - Sampling
- `UnionWithHelper(coll, pipeline)` - Union collections
- `CollStatsHelper(options)` - Statistics
- `CurrentOpHelper(options)` - Current operations

**Each helper includes:**
- Complete TypeScript signature
- Associated stage(s)
- Detailed usage examples
- Practical use cases

---

## 💡 Examples and Tutorials

### [Examples Index](./examples/README.md)
Complete collection of practical examples organized by use case:
- E-Commerce (orders, catalogs, analytics)
- IoT and time series
- Geolocation and GeoJSON
- Analytics and reporting
- Full-text search
- Common patterns and best practices

---

### [Pagination](./examples/pagination.md)
Complete guide to implement pagination:
- Using `Paging(elementsPerPage, page)`
- `GetPagingResult()` vs `GetResult()`
- Pagination with filters and sorting
- Performance optimization
- Page count calculation
- Cursor management

**Use cases:**
- Paginated REST APIs
- User interface tables
- Infinite scroll
- Page navigation

---

### [Lookups and Joins](./examples/lookups.md)
In-depth guide to MongoDB joins:
- Simple equality joins
- Joins with complex conditions
- Multiple cascading joins
- Sub-pipelines in lookups
- Performance optimization
- Denormalization patterns

**Use cases:**
- User-order relationships
- Organizational hierarchies
- Relationship graphs
- Data enrichment

---

## 🎯 Navigation by Use Case

### Filtering and Search
**Need:** Filter documents according to criteria

**Resources:**
- [Match Stage](./api/stages.md#match)
- [Comparison Operators](./api/operators.md#comparison-operators)
- [Field Helper](./api/helpers.md#field)

**Quick example:**
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { Field } from 'mongodb-pipeline-builder/helpers';
import { $Expression, $And, $Equal, $GreaterThan } from 'mongodb-pipeline-builder/operators';

builder
  .Match($Expression($And(
    $Equal('$status', 'active'),
    $GreaterThan('$age', 18)
  )))
  .build();
```

---

### Data Transformation
**Need:** Add, modify or remove fields

**Resources:**
- [AddFields Stage](./api/stages.md#addfields)
- [Project Stage](./api/stages.md#project)
- [Projection Helpers](./api/helpers.md#projection-helpers)
- [Arithmetic Operators](./api/operators.md#arithmetic-operators)

**Quick example:**
```typescript
import { ProjectOnlyHelper, Field } from 'mongodb-pipeline-builder/helpers';

builder
  .AddFields(
    Field('fullName', { $concat: ['$firstName', ' ', '$lastName'] }),
    Field('totalPrice', { $multiply: ['$price', '$quantity'] })
  )
  .Project(ProjectOnlyHelper('fullName', 'totalPrice'))
  .build();
```

---

### Collection Joins
**Need:** Combine data from multiple collections

**Resources:**
- [Lookup Stage](./api/stages.md#lookup)
- [Lookups Guide](./examples/lookups.md)
- [LookupEqualityHelper](./api/helpers.md#lookupequalityhelper)
- [LookupConditionHelper](./api/helpers.md#lookupconditionhelper)

**Quick example:**
```typescript
import { LookupEqualityHelper } from 'mongodb-pipeline-builder/helpers';

builder
  .Lookup(LookupEqualityHelper('orders', 'userOrders', '_id', 'userId'))
  .Unwind({ path: '$userOrders' })
  .build();
```

---

### Aggregation and Grouping
**Need:** Calculate statistics and group data

**Resources:**
- [Group Stage](./api/stages.md#group)
- [Bucket Stage](./api/stages.md#bucket)
- [Accumulator Operators](./api/operators.md#accumulator-operators)
- [BucketHelper](./api/helpers.md#buckethelper)

**Quick example:**
```typescript
import { $Sum, $Avg, $Max, $Min } from 'mongodb-pipeline-builder/operators';

builder
  .Group({
    _id: '$category',
    totalSales: $Sum('$amount'),
    avgPrice: $Avg('$price'),
    maxPrice: $Max('$price'),
    minPrice: $Min('$price'),
    count: $Sum(1)
  })
  .Sort({ totalSales: -1 })
  .build();
```

---

### Pagination
**Need:** Paginate results for large collections

**Resources:**
- [Paging Stage](./api/stages.md#paging)
- [Pagination Guide](./examples/pagination.md)
- `GetPagingResult()` method

**Quick example:**
```typescript
import { PipelineBuilder, GetPagingResult } from 'mongodb-pipeline-builder';

const pipeline = builder
  .Match(Field('active', true))
  .Sort(Field('createdAt', -1))
  .Paging(20, 1)  // 20 per page, page 1
  .build();

const result = await GetPagingResult(Model, pipeline);
console.log(result.GetDocs());  // Documents
console.log(result.GetCount()); // Total
```

---

### Geospatial Search
**Need:** Find documents near a position

**Resources:**
- [GeoNear Stage](./api/stages.md#geonear)
- [GeoNearHelper](./api/helpers.md#geonearhelper)

**Quick example:**
```typescript
import { GeoNearHelper } from 'mongodb-pipeline-builder/helpers';

builder
  .GeoNear(GeoNearHelper(
    { type: 'Point', coordinates: [-73.99, 40.71] },
    'distance',
    { maxDistance: 5000, spherical: true }
  ))
  .Limit(20)
  .build();
```

---

### Time Series
**Need:** Handle time data with gaps

**Resources:**
- [Densify Stage](./api/stages.md#densify)
- [Fill Stage](./api/stages.md#fill)
- [DensifyHelper](./api/helpers.md#densifyhelper)
- [FillHelper](./api/helpers.md#fillhelper)

**Quick example:**
```typescript
import { DensifyHelper, FillHelper } from 'mongodb-pipeline-builder/helpers';

builder
  .Densify(DensifyHelper(
    'timestamp',
    { bounds: 'full', step: 1, unit: 'hour' }
  ))
  .Fill(FillHelper({
    temperature: { method: 'linear' }
  }))
  .build();
```

---

## 📖 Documentation Structure

```
docs/
├── README.md                   # You are here
├── getting-started.md          # Getting started guide
├── migration-guide.md          # Migration v3 → v4
├── api/
│   ├── README.md              # API index
│   ├── stages.md              # All stages
│   ├── operators.md           # All operators
│   └── helpers.md             # All helpers
└── examples/
    ├── README.md              # Examples index
    ├── pagination.md          # Pagination guide
    └── lookups.md             # Lookups guide
```

---

## 🎓 Learning Path

### Beginner Level
1. 📖 [Getting Started Guide](./getting-started.md)
2. 📖 [Basic Stages](./api/stages.md) (Match, Project, Sort, Limit)
3. 💡 [Simple Examples](./examples/README.md)
4. 🔧 [Universal Helpers](./api/helpers.md#universal-helpers)

### Intermediate Level
1. 📖 [Aggregation Stages](./api/stages.md#grouping--aggregation)
2. 💡 [Pagination Guide](./examples/pagination.md)
3. 💡 [Lookups Guide](./examples/lookups.md)
4. 🔧 [Projection and Join Helpers](./api/helpers.md)
5. ⚙️ [Common Operators](./api/operators.md)

### Advanced Level
1. 📖 [Advanced Stages](./api/stages.md) (Facet, SetWindowFields, GraphLookup)
2. 💡 [Complex Patterns](./examples/README.md#common-patterns)
3. 📖 [Change Streams](./api/stages.md#changestream)
4. 📖 [Time Series](./api/stages.md#densify)
5. ⚙️ [Advanced Operators](./api/operators.md) (Window, Array, Date)

---

## 🔗 Useful Links

### External Documentation
- [Official MongoDB Documentation](https://docs.mongodb.com/manual/aggregation/)
- [MongoDB Aggregation Reference](https://docs.mongodb.com/manual/reference/operator/aggregation/)
- [MongoDB University - Aggregation](https://university.mongodb.com/)

### Project
- [GitHub Repository](https://github.com/MikeDev75015/mongodb-pipeline-builder)
- [npm Package](https://www.npmjs.com/package/mongodb-pipeline-builder)
- [Report Issues](https://github.com/MikeDev75015/mongodb-pipeline-builder/issues)
- [Changelog](../CHANGELOG.md)

---

## 🤝 Contributing

Documentation is a collaborative work. Your contributions are welcome!

**To contribute:**
1. Fork the project
2. Create a branch (`git checkout -b docs/improvement`)
3. Make your changes
4. Commit (`git commit -m 'docs: improve X section'`)
5. Push (`git push origin docs/improvement`)
6. Open a Pull Request

**Appreciated types of contributions:**
- Typo corrections
- Adding examples
- Concept clarification
- Translation
- New tutorials

---

## 📄 License

This project is under MIT license. See the [LICENSE](../LICENSE) file for more details.


