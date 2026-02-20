# Getting Started with MongoDB Pipeline Builder

This guide will help you get up and running with the MongoDB Pipeline Builder library.

## Table of Contents

- [Installation](#installation)
- [Basic Concepts](#basic-concepts)
- [Your First Pipeline](#your-first-pipeline)
- [Working with Results](#working-with-results)
- [Common Patterns](#common-patterns)
- [Next Steps](#next-steps)

---

## Installation

### NPM
```bash
npm install mongodb-pipeline-builder
```

### Yarn
```bash
yarn add mongodb-pipeline-builder
```

### PNPM
```bash
pnpm add mongodb-pipeline-builder
```

---

## Basic Concepts

### What is an Aggregation Pipeline?

An aggregation pipeline in MongoDB is a framework for data aggregation that processes data records and returns computed results. It's similar to SQL's GROUP BY clause but more powerful and flexible.

### Why Use Pipeline Builder?

**Without Pipeline Builder:**
```typescript
const pipeline = [
  { $match: { $expr: { $eq: ["$status", "active"] } } },
  { $project: { _id: 0, name: 1, email: 1 } },
  { $sort: { name: 1 } },
  { $limit: 10 }
];
```

**With Pipeline Builder:**
```typescript
const pipeline = new PipelineBuilder('active-users')
  .Match($Expression($Equal('$status', 'active')))
  .Project(ProjectOnlyHelper('name', 'email'))
  .Sort({ name: 1 })
  .Limit(10)
  .build();
```

**Benefits:**
- ✅ More readable and maintainable
- ✅ Type-safe with TypeScript
- ✅ Automatic validation
- ✅ Reusable helpers
- ✅ Better IDE autocomplete

---

## Your First Pipeline

### Step 1: Import Dependencies

```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { ProjectOnlyHelper } from 'mongodb-pipeline-builder/helpers';
import { $Expression, $Equal } from 'mongodb-pipeline-builder/operators';
```

### Step 2: Create a Pipeline

```typescript
const pipeline = new PipelineBuilder('my-first-pipeline')
  .Match($Expression($Equal('$status', 'active')))
  .Project(ProjectOnlyHelper('name', 'email', 'createdAt'))
  .Sort({ createdAt: -1 })
  .Limit(10)
  .build();
```

### Step 3: Use the Pipeline

**With MongoDB Native Driver:**
```typescript
const results = await db.collection('users').aggregate(pipeline).toArray();
console.log(results);
```

**With Mongoose:**
```typescript
const results = await User.aggregate(pipeline);
console.log(results);
```

---

## Working with Results

### GetResult (Non-Paginated Queries)

Use `GetResult` when you're not using the `Paging` stage:

```typescript
import { GetResult } from 'mongodb-pipeline-builder';

interface User {
  name: string;
  email: string;
  age: number;
}

const pipeline = new PipelineBuilder('get-users')
  .Match($Expression($Equal('$status', 'active')))
  .Project(ProjectOnlyHelper('name', 'email', 'age'))
  .build();

// Execute with type safety
const result = await GetResult<User>(User, pipeline);

// Access results
const users = result.GetDocs();           // User[]
const count = result.GetCount();          // number
const firstUser = result.GetElement(0);   // User | undefined
const lastUser = result.GetElement('last'); // User | undefined
```

### GetPagingResult (Paginated Queries)

Use `GetPagingResult` when using the `Paging` stage:

```typescript
import { GetPagingResult } from 'mongodb-pipeline-builder';

const pipeline = new PipelineBuilder('paginated-users')
  .Match($Expression($Equal('$status', 'active')))
  .Project(ProjectOnlyHelper('name', 'email', 'age'))
  .Paging(20, 1) // 20 per page, page 1
  .build();

// Execute with type safety
const result = await GetPagingResult<User>(User, pipeline);

// Access results
const users = result.GetDocs();           // User[]
const count = result.GetCount();          // number
const totalPages = result.GetTotalPageNumber(); // number
```

---

## Common Patterns

### 1. Simple Filtering

```typescript
const pipeline = new PipelineBuilder('filter-users')
  .Match($Expression($GreaterThanEqual('$age', 18)))
  .build();
```

### 2. Projection (Select Fields)

```typescript
// Only specific fields (excludes _id)
const pipeline = new PipelineBuilder('select-fields')
  .Project(ProjectOnlyHelper('name', 'email'))
  .build();

// Exclude specific fields
const pipeline = new PipelineBuilder('exclude-fields')
  .Project(ProjectIgnoreHelper('password', 'refreshToken'))
  .build();
```

### 3. Sorting

```typescript
const pipeline = new PipelineBuilder('sort-users')
  .Sort({ createdAt: -1, name: 1 }) // -1 = descending, 1 = ascending
  .build();
```

### 4. Limiting Results

```typescript
const pipeline = new PipelineBuilder('top-10')
  .Sort({ score: -1 })
  .Limit(10)
  .build();
```

### 5. Joining Collections (Lookup)

```typescript
import { LookupEqualityHelper } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('users-with-orders')
  .Lookup(LookupEqualityHelper(
    'orders',      // from collection
    'orders',      // as field name
    '_id',         // local field
    'userId'       // foreign field
  ))
  .build();
```

### 6. Adding Computed Fields

```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';
import { $Size } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('users-with-order-count')
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  .AddFields(
    Field('orderCount', $Size('$orders'))
  )
  .build();
```

### 7. Grouping and Aggregating

```typescript
import { $Sum, $Average } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('sales-by-category')
  .Group({
    _id: '$category',
    totalSales: $Sum('$amount'),
    averagePrice: $Average('$price'),
    count: $Sum(1)
  })
  .Sort({ totalSales: -1 })
  .build();
```

---

## Next Steps

Now that you understand the basics, explore more advanced topics:

- 📖 [Pipeline Stages Reference](./api/stages.md)
- 📖 [Operators Reference](./api/operators.md)
- 📖 [Helpers Reference](./api/helpers.md)
- 💡 [Pagination Examples](./examples/pagination.md)
- 💡 [Lookup Examples](./examples/lookups.md)
- 💡 [Complex Aggregations](./examples/aggregations.md)

---

## Need Help?

- 🐛 [Report Issues](https://github.com/MikeDev75015/mongodb-pipeline-builder/issues)
- 📚 [Technical Documentation](https://mikedev75015.github.io/mongodb-pipeline-builder)
- 💬 [MongoDB Documentation](https://docs.mongodb.com/manual/aggregation/)

