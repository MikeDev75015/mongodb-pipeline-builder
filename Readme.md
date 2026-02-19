<div align="center">

[![NPM version](https://img.shields.io/npm/v/mongodb-pipeline-builder.svg)](https://www.npmjs.com/package/mongodb-pipeline-builder)
![NPM](https://img.shields.io/npm/l/mongodb-pipeline-builder?registry_uri=https%3A%2F%2Fregistry.npmjs.com)
![npm](https://img.shields.io/npm/dw/mongodb-pipeline-builder)

![GitHub branch checks state](https://img.shields.io/github/checks-status/MikeDev75015/mongodb-pipeline-builder/main)
[![CircleCI](https://circleci.com/gh/MikeDev75015/mongodb-pipeline-builder.svg?style=shield)](https://app.circleci.com/pipelines/github/MikeDev75015/mongodb-pipeline-builder)
![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)

![Sonar Tests](https://img.shields.io/sonar/tests/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Coverage](https://img.shields.io/sonar/coverage/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)
<img src="https://mikedev75015.github.io/mongodb-pipeline-builder/images/coverage-badge-documentation.svg" alt="documentation-badge">

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=security_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)

---

[📚 Technical Documentation](https://mikedev75015.github.io/mongodb-pipeline-builder)

# MongoDB Pipeline Builder

**A type-safe, fluent API for building MongoDB aggregation pipelines**

</div>

## 🚀 Overview

**mongodb-pipeline-builder** is a powerful TypeScript library that simplifies the creation of MongoDB aggregation pipelines. It provides a fluent, type-safe API that makes your aggregation pipelines more readable, maintainable, and less error-prone.

### Key Features

✨ **Type-Safe** - Full TypeScript support with generics for typed responses  
📖 **Readable** - Fluent API that makes complex pipelines easy to understand  
🔧 **Maintainable** - Modular design with reusable helpers  
🎯 **Complete** - Supports all MongoDB aggregation stages and operators  
⚡ **Efficient** - Built-in pagination support with optimized queries  
🛡️ **Validated** - Automatic validation of pipeline stages  

### Supported Platforms

- ✅ [MongoDB Native Driver](https://www.mongodb.com/docs/drivers/node/current/) - `db.collection.aggregate()`
- ✅ [MongoDB Database Commands](https://www.mongodb.com/docs/manual/reference/method/db.aggregate/) - `db.aggregate()`
- ✅ [Mongoose](https://mongoosejs.com/) - `Model.aggregate()`

---

## 📦 Installation

```bash
npm install mongodb-pipeline-builder
```

```bash
yarn add mongodb-pipeline-builder
```

```bash
pnpm add mongodb-pipeline-builder
```

---

## 🎯 Quick Start

### Basic Example

```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { ProjectOnlyHelper } from 'mongodb-pipeline-builder/helpers';
import { $Expression, $Equal } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('users-query')
  .Match($Expression($Equal('$status', 'active')))
  .Project(ProjectOnlyHelper('name', 'email', 'createdAt'))
  .Sort({ createdAt: -1 })
  .Limit(10)
  .build();

// Use with MongoDB
const results = await db.collection('users').aggregate(pipeline).toArray();

// Use with Mongoose
const results = await User.aggregate(pipeline);
```

### With Pagination

```typescript
import { PipelineBuilder, GetPagingResult } from 'mongodb-pipeline-builder';
import { $Expression, $GreaterThan } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('paginated-users')
  .Match($Expression($GreaterThan('$age', 18)))
  .Sort({ createdAt: -1 })
  .Paging(20, 1) // 20 items per page, page 1
  .build();

const result = await GetPagingResult(User, pipeline);

console.log(result.GetDocs());           // Document array
console.log(result.GetCount());          // Total count
console.log(result.GetTotalPageNumber()); // Total pages
```

### With Lookups (Joins)

```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { LookupEqualityHelper, Field } from 'mongodb-pipeline-builder/helpers';
import { $ArrayElementAt } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('users-with-profiles')
  .Lookup(LookupEqualityHelper('profiles', 'profile', 'profileId', '_id'))
  .AddFields(
    Field('profileData', $ArrayElementAt('$profile', 0))
  )
  .Unset('profile')
  .build();
```

---

## 📚 Documentation

### Core Concepts

- **[Getting Started Guide](./docs/getting-started.md)** - Detailed introduction and setup
- **[Migration Guide v3 → v4](./docs/migration-guide.md)** - Upgrade from version 3

### API Reference

- **[Pipeline Stages](./docs/api/stages.md)** - All MongoDB aggregation stages
- **[Operators](./docs/api/operators.md)** - Aggregation operators ($match, $group, etc.)
- **[Helpers](./docs/api/helpers.md)** - Utility functions for common patterns

### Examples & Tutorials

- **[Pagination Examples](./docs/examples/pagination.md)** - Implementing pagination patterns
- **[Lookup & Join Examples](./docs/examples/lookups.md)** - Working with multiple collections
- **[Complex Aggregations](./docs/examples/aggregations.md)** - Advanced aggregation patterns

---

## 🔥 What's New in v4

### Breaking Changes

#### PipelineBuilder
- ✨ `build()` replaces `getPipeline()`
- 🆕 New stages: `ChangeStream`, `ChangeStreamSplitLargeEvent`, `Densify`, `Documents`, `Fill`, `ListLocalSessions`, `ListSampledQueries`, `ListSearchIndexes`, `SearchMeta`, `SetWindowFields`, `ShardedDataDistribution`
- 🆕 `Insert()` stage for adding custom stages without validation
- ✅ Automatic detection of non-duplicable stages

#### Helpers
- 🔄 `Payload` suffix → `Helper` suffix
- 🏷️ Prefixed with stage name (e.g., `LookupEqualityHelper`)

#### Operators
- 🏷️ All operators prefixed with `$` (e.g., `$Add`, `$Match`)
- 🔄 `MapOperator` → `$Map`

#### Result Methods
- 🎯 `GetResult<T>()` - For non-paginated queries
  - ✨ `GetElement(index | 'last')` - New method to get specific document
  - 🚀 Generic type support for typed responses
- 🎯 `GetPagingResult<T>()` - Exclusively for paginated queries
  - 🚀 Generic type support for typed responses

---

## 💡 Real-World Example

```typescript
import { PipelineBuilder, GetResult } from 'mongodb-pipeline-builder';
import { 
  LookupEqualityHelper, 
  ProjectOnlyHelper, 
  Field 
} from 'mongodb-pipeline-builder/helpers';
import { 
  $Expression, 
  $And,
  $Equal, 
  $GreaterThanEqual,
  $ArrayElementAt 
} from 'mongodb-pipeline-builder/operators';

// Complex query: Active users with their orders
const pipeline = new PipelineBuilder('active-users-with-orders', { debug: true })
  // Filter active users over 18
  .Match($Expression(
    $And(
      $Equal('$status', 'active'),
      $GreaterThanEqual('$age', 18)
    )
  ))
  
  // Join with orders collection
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  
  // Project specific fields
  .Project(ProjectOnlyHelper('name', 'email', 'age'))
  
  // Add computed fields
  .AddFields(
    Field('totalOrders', { $size: '$orders' }),
    Field('lastOrder', $ArrayElementAt('$orders', -1))
  )
  
  // Sort by total orders descending
  .Sort(Field('totalOrders', -1))
  
  // Limit results
  .Limit(50)
  
  .build();

// Execute query with typed response
interface UserWithOrders {
  name: string;
  email: string;
  age: number;
  totalOrders: number;
  lastOrder?: any;
}

const result = await GetResult<UserWithOrders>(User, pipeline);

// Access results
const users = result.GetDocs();        // UserWithOrders[]
const count = result.GetCount();       // number
const firstUser = result.GetElement(0); // UserWithOrders | undefined
const lastUser = result.GetElement('last'); // UserWithOrders | undefined
```

---

## 🧪 Try It Online

[→ Try the library on NPM RunKit](https://npm.runkit.com/mongodb-pipeline-builder)

---

## 📊 Comparison: Before & After

### Before (Raw MongoDB)

```typescript
const pipeline = [
  { 
    $match: { 
      $expr: { 
        $and: [
          { $eq: ["$status", "active"] },
          { $gte: ["$age", 18] }
        ]
      } 
    } 
  },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
    }
  },
  { 
    $project: { 
      _id: 0, 
      name: 1, 
      email: 1, 
      age: 1,
      totalOrders: { $size: "$orders" },
      lastOrder: { $arrayElemAt: ["$orders", -1] }
    } 
  },
  { $sort: { totalOrders: -1 } },
  { $limit: 50 }
];
```

### After (With Pipeline Builder)

```typescript
const pipeline = new PipelineBuilder('active-users')
  .Match($Expression($And(
    $Equal('$status', 'active'),
    $GreaterThanEqual('$age', 18)
  )))
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  .Project(
    ProjectOnlyHelper('name', 'email', 'age'),
    Field('totalOrders', { $size: '$orders' }),
    Field('lastOrder', $ArrayElementAt('$orders', -1))
  )
  .Sort(Field('totalOrders', -1))
  .Limit(50)
  .build();
```

---

## 🔍 Working with Results

### GetResult<T> - For Non-Paginated Queries

Use when your pipeline does **not** include the `Paging` stage:

```typescript
import { GetResult } from 'mongodb-pipeline-builder';

interface User {
  name: string;
  email: string;
  age: number;
}

const pipeline = new PipelineBuilder('users')
  .Match($Expression($Equal('$status', 'active')))
  .build();

const result = await GetResult<User>(User, pipeline);

const users = result.GetDocs();           // User[] - all documents  
const count = result.GetCount();          // number - total count
const firstUser = result.GetElement(0);   // User | undefined
const lastUser = result.GetElement('last'); // User | undefined
```

---

### GetPagingResult<T> - For Paginated Queries

Use **exclusively** when your pipeline includes the `Paging` stage:

```typescript
import { GetPagingResult } from 'mongodb-pipeline-builder';

const pipeline = new PipelineBuilder('users')
  .Match($Expression($Equal('$status', 'active')))
  .Paging(20, 1) // Required for GetPagingResult
  .build();

const result = await GetPagingResult<User>(User, pipeline);

const users = result.GetDocs();           // User[] - current page
const totalCount = result.GetCount();     // number - total documents
const totalPages = result.GetTotalPageNumber(); // number - total pages
```

> 📖 **Learn More:** See [Getting Started Guide](./docs/getting-started.md) for detailed examples

---

## 📚 API Reference Quick Links

### Pipeline Stages

All MongoDB aggregation stages are supported. See [complete reference](./docs/api/stages.md).

**Common Stages:**
- `Match()` - Filter documents
- `Project()` - Select/transform fields
- `Group()` - Group and aggregate
- `Sort()` - Sort documents
- `Limit()` - Limit results
- `Lookup()` - Join collections
- `Unwind()` - Deconstruct arrays
- `AddFields()` - Add computed fields
- `Paging()` - Add pagination

### Operators

100+ MongoDB operators supported. See [complete reference](./docs/api/operators.md).

**Common Operators:**
- Comparison: `$Equal`, `$GreaterThan`, `$LessThan`
- Logical: `$And`, `$Or`, `$Not`
- Arithmetic: `$Add`, `$Subtract`, `$Multiply`, `$Divide`
- Array: `$Size`, `$Filter`, `$Map`, `$ArrayElementAt`
- String: `$Concat`, `$ToLower`, `$ToUpper`, `$Split`
- Date: `$DateAdd`, `$DateSubtract`, `$DateDifference`
- Aggregation: `$Sum`, `$Average`, `$Min`, `$Max`

### Helpers

20+ helper functions for common patterns. See [complete list in stages.md](./docs/api/stages.md#complete-helpers-reference).

**Common Helpers:**
- `Field(name, value)` - Universal field helper
- `ProjectOnlyHelper(...fields)` - Include specific fields
- `LookupEqualityHelper(...)` - Simple joins
- `BucketHelper(...)` - Categorize documents
- `SearchHelper(...)` - Full-text search

---

## 🎓 Quick Examples

### Example 1: Simple Query
```typescript
const pipeline = new PipelineBuilder('active-users')
  .Match($Expression($Equal('$status', 'active')))
  .Project(ProjectOnlyHelper('name', 'email'))
  .Sort({ createdAt: -1 })
  .Limit(10)
  .build();

const result = await GetResult<User>(User, pipeline);
```

### Example 2: With Pagination
```typescript
const pipeline = new PipelineBuilder('paginated')
  .Match($Expression($GreaterThan('$price', 100)))
  .Sort({ price: -1 })
  .Paging(20, 1)
  .build();

const result = await GetPagingResult<Product>(Product, pipeline);
console.log(`Page 1 of ${result.GetTotalPageNumber()}`);
```

### Example 3: With Joins
```typescript
const pipeline = new PipelineBuilder('users-with-orders')
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  .AddFields(
    Field('orderCount', $Size('$orders')),
    Field('lastOrder', $ArrayElementAt('$orders', -1))
  )
  .Match($Expression($GreaterThan('$orderCount', 0)))
  .build();
```

### Example 4: Complex Aggregation
```typescript
const pipeline = new PipelineBuilder('sales-by-category')
  .Match($Expression($Equal('$year', 2024)))
  .Group({
    _id: '$category',
    totalSales: $Sum('$amount'),
    averagePrice: $Average('$price'),
    count: $Sum(1)
  })
  .Sort({ totalSales: -1 })
  .Limit(10)
  .build();
```

---

## ❓ FAQ

<details>
<summary><strong>When should I use GetResult vs GetPagingResult?</strong></summary>

- Use `GetResult` for queries **without** the `Paging` stage
- Use `GetPagingResult` **exclusively** when using the `Paging` stage

The `Paging` stage wraps your pipeline in `$facet` for efficient pagination.
</details>

<details>
<summary><strong>Can I use raw MongoDB syntax?</strong></summary>

Yes! Use the `Insert` stage:
```typescript
builder.Insert({ $myCustomStage: { field: 'value' } })
```
Useful for new MongoDB stages or custom implementations.
</details>

<details>
<summary><strong>Does it work with Mongoose?</strong></summary>

Yes! Works with:
- **MongoDB Native Driver:** `db.collection.aggregate()`
- **Mongoose:** `Model.aggregate()`
- **MongoDB Database Commands:** `db.aggregate()`
</details>

<details>
<summary><strong>Are all MongoDB stages supported?</strong></summary>

Yes! All stages through MongoDB 7.0+ including `$densify`, `$fill`, `$setWindowFields`, `$searchMeta`, and more.
</details>

<details>
<summary><strong>How do I handle TypeScript types?</strong></summary>

Use generics:
```typescript
interface User { name: string; email: string; }
const result = await GetResult<User>(User, pipeline);
const users: User[] = result.GetDocs(); // Fully typed!
```
</details>

<details>
<summary><strong>Can I chain multiple lookups?</strong></summary>

Yes! Chain as many as needed:
```typescript
builder
  .Lookup(LookupEqualityHelper('profiles', 'profile', '_id', 'userId'))
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  .Lookup(LookupEqualityHelper('subscriptions', 'sub', '_id', 'userId'))
```
See [Lookup Examples](./docs/examples/lookups.md).
</details>

---

## 📈 Performance Tips

1. **Index your fields** - Create indexes on `$match` and `$sort` fields
2. **Match early** - Apply `$match` as early as possible
3. **Project early** - Remove unnecessary fields to reduce memory
4. **Limit lookups** - Use pipeline syntax to limit joined documents
5. **Use covered queries** - Query only indexed fields when possible

> 📖 **Learn More:** [Pagination Examples](./docs/examples/pagination.md#performance-tips)

---

## 🆘 Support

### Getting Help

- 📖 [Documentation](./docs/getting-started.md)
- 🐛 [Issue Tracker](https://github.com/MikeDev75015/mongodb-pipeline-builder/issues)
- 💬 [MongoDB Docs](https://docs.mongodb.com/manual/aggregation/)

### Reporting Issues

Include:
- Package version
- Node.js and MongoDB versions
- Code snippet
- Expected vs actual behavior

---


## 📜 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

**Made with ❤️ by [Mickaël NODANCHE](https://cv-mikeonline.web.app)**
