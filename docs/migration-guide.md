# Migration Guide: v3 to v4

This guide will help you migrate your code from version 3 to version 4 of mongodb-pipeline-builder.

## Table of Contents

- [Overview](#overview)
- [Breaking Changes](#breaking-changes)
- [Migration Checklist](#migration-checklist)
- [Detailed Changes](#detailed-changes)
- [New Features](#new-features)

---

## Overview

Version 4 introduces several breaking changes aimed at improving consistency, type safety, and usability. The main changes involve:

1. Method naming conventions
2. Helper naming conventions
3. Operator naming conventions
4. Result methods improvements

---

## Breaking Changes

### 1. PipelineBuilder Methods

#### `getPipeline()` → `build()`

**v3:**
```typescript
const pipeline = new PipelineBuilder('example').Match(...).getPipeline();
```

**v4:**
```typescript
const pipeline = new PipelineBuilder('example').Match(...).build();
```

---

### 2. Helpers Naming

All helpers now use the `Helper` suffix instead of `Payload`, and are prefixed with their stage name.

#### Lookup Helpers

**v3:**
```typescript
import { LookupEqualityPayload } from 'mongodb-pipeline-builder/helpers';

LookupEqualityPayload('users', 'users', 'userId', 'id')
```

**v4:**
```typescript
import { LookupEqualityHelper } from 'mongodb-pipeline-builder/helpers';

LookupEqualityHelper('users', 'users', 'userId', 'id')
```

#### Project Helpers

**v3:**
```typescript
import { ProjectOnlyPayload, ProjectIgnorePayload } from 'mongodb-pipeline-builder/helpers';

ProjectOnlyPayload('name', 'email')
ProjectIgnorePayload('password', 'token')
```

**v4:**
```typescript
import { ProjectOnlyHelper, ProjectIgnoreHelper } from 'mongodb-pipeline-builder/helpers';

ProjectOnlyHelper('name', 'email')
ProjectIgnoreHelper('password', 'token')
```

#### Other Helpers

| v3 Name | v4 Name |
|---------|---------|
| `BucketPayload` | `BucketHelper` |
| `BucketAutoPayload` | `BucketAutoHelper` |
| `CollStatsPayload` | `CollStatsHelper` |
| `CurrentOpPayload` | `CurrentOpHelper` |
| `DensifyPayload` | `DensifyHelper` |
| `FillPayload` | `FillHelper` |
| `GeoNearPayload` | `GeoNearHelper` |
| `MergePayload` | `MergeHelper` |
| `OutPayload` | `OutHelper` |
| `SamplePayload` | `SampleHelper` |
| `SearchPayload` | `SearchHelper` |
| `SearchMetaPayload` | `SearchMetaHelper` |
| `UnionWithPayload` | `UnionWithHelper` |
| `ChangeStreamPayload` | `ChangeStreamHelper` |

---

### 3. Operators Naming

All operators are now prefixed with `$`.

**v3:**
```typescript
import { Add, Equal, GreaterThan } from 'mongodb-pipeline-builder/operators';

Add('$price', 10)
Equal('$status', 'active')
GreaterThan('$age', 18)
```

**v4:**
```typescript
import { $Add, $Equal, $GreaterThan } from 'mongodb-pipeline-builder/operators';

$Add('$price', 10)
$Equal('$status', 'active')
$GreaterThan('$age', 18)
```

#### Special Case: MapOperator

**v3:**
```typescript
import { MapOperator } from 'mongodb-pipeline-builder/operators';

MapOperator('$items', 'item', { $multiply: ['$$item.price', '$$item.quantity'] })
```

**v4:**
```typescript
import { $Map } from 'mongodb-pipeline-builder/operators';

$Map('$items', 'item', { $multiply: ['$$item.price', '$$item.quantity'] })
```

---

### 4. Result Methods

#### GetResult Changes

**v3:**
```typescript
const result = await GetResult(User, pipeline);
result.GetDocs(0, 10); // With pagination arguments
```

**v4:**
```typescript
const result = await GetResult<UserType>(User, pipeline);
result.GetDocs();         // No arguments - returns all docs
result.GetElement(0);     // New method to get specific element
result.GetElement('last'); // Get last element
```

#### GetPagingResult

**v3:**
```typescript
const result = await GetPagingResult(User, pipeline);
```

**v4:**
```typescript
// Same API, but now with generic type support
const result = await GetPagingResult<UserType>(User, pipeline);
```

---

## Migration Checklist

Use this checklist to ensure you've covered all migration points:

- [ ] Replace all `getPipeline()` with `build()`
- [ ] Update all helper names from `Payload` to `Helper`
- [ ] Prefix all operators with `$`
- [ ] Replace `MapOperator` with `$Map`
- [ ] Update `GetResult` usage (remove arguments from `GetDocs()`)
- [ ] Add generic types to `GetResult<T>` and `GetPagingResult<T>` where appropriate
- [ ] Test all pipelines
- [ ] Update imports

---

## Detailed Changes

### Full Import Migration Example

**v3:**
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { 
  LookupEqualityPayload, 
  ProjectOnlyPayload,
  Field 
} from 'mongodb-pipeline-builder/helpers';
import { 
  Equal, 
  GreaterThanEqual, 
  ArrayElementAt,
  Expression,
  MapOperator
} from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('example')
  .Match(Expression(Equal('$status', 'active')))
  .Lookup(LookupEqualityPayload('orders', 'orders', '_id', 'userId'))
  .Project(ProjectOnlyPayload('name', 'email'))
  .AddFields(
    Field('firstOrder', ArrayElementAt('$orders', 0))
  )
  .getPipeline();
```

**v4:**
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { 
  LookupEqualityHelper, 
  ProjectOnlyHelper,
  Field 
} from 'mongodb-pipeline-builder/helpers';
import { 
  $Equal, 
  $GreaterThanEqual, 
  $ArrayElementAt,
  $Expression,
  $Map
} from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('example')
  .Match($Expression($Equal('$status', 'active')))
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  .Project(ProjectOnlyHelper('name', 'email'))
  .AddFields(
    Field('firstOrder', $ArrayElementAt('$orders', 0))
  )
  .build();
```

---

## New Features

### New Stages

v4 adds support for several new MongoDB aggregation stages:

#### ChangeStream
```typescript
import { ChangeStreamHelper } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('watch-changes')
  .ChangeStream(ChangeStreamHelper({ fullDocument: 'updateLookup' }))
  .build();
```

#### Densify
```typescript
import { DensifyHelper } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('densify-data')
  .Densify(DensifyHelper(
    'timestamp',
    { bounds: 'full', step: 1, unit: 'hour' }
  ))
  .build();
```

#### Documents
```typescript
const pipeline = new PipelineBuilder('inline-docs')
  .Documents(
    { _id: 1, name: 'John' },
    { _id: 2, name: 'Jane' }
  )
  .build();
```

#### Fill
```typescript
import { FillHelper } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('fill-missing')
  .Fill(FillHelper({
    price: { method: 'linear' },
    quantity: { value: 0 }
  }))
  .build();
```

#### SetWindowFields
```typescript
const pipeline = new PipelineBuilder('window-functions')
  .SetWindowFields({
    partitionBy: '$category',
    sortBy: { date: 1 },
    output: {
      runningTotal: {
        $sum: '$amount',
        window: { documents: ['unbounded', 'current'] }
      }
    }
  })
  .build();
```

#### SearchMeta
```typescript
import { SearchMetaHelper } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('search-metadata')
  .SearchMeta(SearchMetaHelper({
    facet: {
      operator: { text: { query: 'example', path: 'description' } },
      facets: {
        categoryFacet: { type: 'string', path: 'category' }
      }
    }
  }))
  .build();
```

### Insert Stage (Custom Stages)

The new `Insert` stage allows you to add custom stages without validation:

```typescript
const pipeline = new PipelineBuilder('custom-stage')
  .Insert({ $myCustomStage: { field: 'value' } })
  .build();
```

This is useful for:
- Newly released MongoDB stages not yet supported
- Custom stages in MongoDB forks
- Testing experimental features

### Non-Duplicable Stage Detection

v4 automatically detects when you try to add non-duplicable stages multiple times:

```typescript
const pipeline = new PipelineBuilder('example')
  .Out(OutHelper('collection1'))
  .Out(OutHelper('collection2')); // ⚠️ Error: $out can only appear once
```

Stages that cannot be duplicated:
- `Out`
- `Merge`
- `GeoNear`
- `ChangeStream`
- `ChangeStreamSplitLargeEvent`
- `Paging`

---

## Automated Migration

### Find & Replace Strategy

You can use your IDE's find and replace feature to automate most of the migration:

1. **Helpers**: Replace `Payload` with `Helper` (case-sensitive)
2. **Operators**: Use regex to prefix operators with `$`:
   - Find: `import \{ (.*?) \} from 'mongodb-pipeline-builder/operators'`
   - Replace manually by adding `$` prefix to each operator
3. **Methods**: Replace `.getPipeline()` with `.build()`

### Test After Migration

After migration, ensure you:

1. Run your test suite
2. Check TypeScript compilation errors
3. Review all usages of `GetResult` and `GetPagingResult`
4. Verify pipeline outputs match expected structure

---

## Need Help?

If you encounter issues during migration:

1. 📚 Check the [API Documentation](./api/stages.md)
2. 🐛 [Report Migration Issues](https://github.com/MikeDev75015/mongodb-pipeline-builder/issues)
3. 💬 Review the [Examples](./examples/)

---

## Summary

The migration from v3 to v4 primarily involves:
- Renaming methods and helpers for consistency
- Adding `$` prefix to operators
- Using the new `build()` method
- Taking advantage of TypeScript generics

While these are breaking changes, they make the library more consistent, intuitive, and type-safe.

