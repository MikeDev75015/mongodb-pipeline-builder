# Pagination Examples

This guide covers various pagination patterns using the MongoDB Pipeline Builder.

## Table of Contents

- [Basic Pagination](#basic-pagination)
- [Pagination with Filtering](#pagination-with-filtering)
- [Pagination with Sorting](#pagination-with-sorting)
- [Pagination with Joins](#pagination-with-joins)
- [Advanced Pagination Patterns](#advanced-pagination-patterns)
- [Performance Tips](#performance-tips)

---

## Basic Pagination

### Simple Pagination

The `Paging` stage automatically creates an optimized pagination pipeline using `$facet`, `$skip`, and `$limit`.

```typescript
import { PipelineBuilder, GetPagingResult } from 'mongodb-pipeline-builder';

const ITEMS_PER_PAGE = 20;
const CURRENT_PAGE = 1;

const pipeline = new PipelineBuilder('basic-pagination')
  .Paging(ITEMS_PER_PAGE, CURRENT_PAGE)
  .build();

// Execute the pipeline
const result = await GetPagingResult<Product>(Product, pipeline);

// Access paginated results
const products = result.GetDocs();           // Product[] - 20 items
const totalCount = result.GetCount();        // number - total matching documents
const totalPages = result.GetTotalPageNumber(); // number - total pages
```

**Generated Pipeline:**
```typescript
[
  {
    $facet: {
      docs: [
        { $skip: 0 },   // (page - 1) * itemsPerPage
        { $limit: 20 }
      ],
      count: [
        { $count: "totalElements" }
      ]
    }
  }
]
```

---

## Pagination with Filtering

### Filter Before Paginating

Always apply filters before the `Paging` stage to reduce the dataset:

```typescript
import { $Expression, $And, $Equal, $GreaterThanEqual } from 'mongodb-pipeline-builder/operators';

interface Product {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const pipeline = new PipelineBuilder('filtered-pagination')
  .Match($Expression($And(
    $Equal('$inStock', true),
    $Equal('$category', 'Electronics'),
    $GreaterThanEqual('$price', 100)
  )))
  .Paging(20, 1)
  .build();

const result = await GetPagingResult<Product>(Product, pipeline);
```

**Generated Pipeline:**
```typescript
[
  {
    $facet: {
      docs: [
        { 
          $match: { 
            $expr: { 
              $and: [
                { $eq: ["$inStock", true] },
                { $eq: ["$category", "Electronics"] },
                { $gte: ["$price", 100] }
              ]
            } 
          } 
        },
        { $skip: 0 },
        { $limit: 20 }
      ],
      count: [
        { 
          $match: { 
            $expr: { 
              $and: [
                { $eq: ["$inStock", true] },
                { $eq: ["$category", "Electronics"] },
                { $gte: ["$price", 100] }
              ]
            } 
          } 
        },
        { $count: "totalElements" }
      ]
    }
  }
]
```

---

## Pagination with Sorting

### Sort Before Paginating

```typescript
import { Field } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('sorted-pagination')
  .Match($Expression($Equal('$status', 'active')))
  .Sort(
    Field('priority', -1),    // Sort by priority descending
    Field('createdAt', -1)    // Then by creation date descending
  )
  .Paging(25, 1)
  .build();
```

### Sort with Text Score

```typescript
import { $Meta } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('search-pagination')
  .Match({ $text: { $search: 'mongodb' } })
  .AddFields(
    Field('score', $Meta('textScore'))
  )
  .Sort(Field('score', -1))
  .Project(ProjectIgnoreHelper('score'))
  .Paging(10, 1)
  .build();
```

---

## Pagination with Joins

### Paginate with Lookup

```typescript
import { LookupEqualityHelper, ProjectOnlyHelper } from 'mongodb-pipeline-builder/helpers';
import { $ArrayElementAt, $Size } from 'mongodb-pipeline-builder/operators';

interface User {
  name: string;
  email: string;
  orderCount: number;
  latestOrder: any;
}

const pipeline = new PipelineBuilder('users-with-orders')
  // Join with orders collection
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  
  // Add computed fields
  .AddFields(
    Field('orderCount', $Size('$orders')),
    Field('latestOrder', $ArrayElementAt('$orders', -1))
  )
  
  // Filter users with orders
  .Match($Expression($GreaterThan('$orderCount', 0)))
  
  // Sort by order count
  .Sort(Field('orderCount', -1))
  
  // Project fields
  .Project(ProjectOnlyHelper('name', 'email', 'orderCount', 'latestOrder'))
  
  // Paginate
  .Paging(20, 1)
  .build();

const result = await GetPagingResult<User>(User, pipeline);
```

---

## Advanced Pagination Patterns

### Dynamic Pagination Parameters

```typescript
function buildPaginatedPipeline(
  page: number,
  limit: number,
  filters?: any,
  sortBy?: any
) {
  const builder = new PipelineBuilder('dynamic-pagination');
  
  // Apply filters if provided
  if (filters) {
    builder.Match(filters);
  }
  
  // Apply sorting if provided
  if (sortBy) {
    builder.Sort(sortBy);
  }
  
  // Apply pagination
  builder.Paging(limit, page);
  
  return builder.build();
}

// Usage
const pipeline = buildPaginatedPipeline(
  2,              // page 2
  50,             // 50 items per page
  { status: 'active' },
  { createdAt: -1 }
);
```

### Cursor-Based Pagination Alternative

While the library's `Paging` stage uses offset-based pagination, you can implement cursor-based pagination manually:

```typescript
import { $GreaterThan } from 'mongodb-pipeline-builder/operators';

function buildCursorPagination(lastId?: string, limit: number = 20) {
  const builder = new PipelineBuilder('cursor-pagination');
  
  // If we have a cursor (lastId), start from there
  if (lastId) {
    builder.Match($Expression($GreaterThan('$_id', lastId)));
  }
  
  // Sort by _id and limit
  builder
    .Sort({ _id: 1 })
    .Limit(limit);
  
  return builder.build();
}

// First page
const page1Pipeline = buildCursorPagination(undefined, 20);
const page1Results = await GetResult<Item>(Item, page1Pipeline);
const page1Items = page1Results.GetDocs();

// Next page using last item's ID as cursor
const lastItem = page1Items[page1Items.length - 1];
const page2Pipeline = buildCursorPagination(lastItem._id, 20);
const page2Results = await GetResult<Item>(Item, page2Pipeline);
```

### Pagination with Aggregation

```typescript
import { $Sum, $Average, $Min, $Max } from 'mongodb-pipeline-builder/operators';

interface CategoryStats {
  category: string;
  totalProducts: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
}

const pipeline = new PipelineBuilder('category-stats-paginated')
  // Group by category
  .Group({
    _id: '$category',
    totalProducts: $Sum(1),
    averagePrice: $Average('$price'),
    minPrice: $Min('$price'),
    maxPrice: $Max('$price')
  })
  
  // Reshape the output
  .Project({
    _id: 0,
    category: '$_id',
    totalProducts: 1,
    averagePrice: 1,
    minPrice: 1,
    maxPrice: 1
  })
  
  // Sort by total products
  .Sort({ totalProducts: -1 })
  
  // Paginate
  .Paging(10, 1)
  .build();

const result = await GetPagingResult<CategoryStats>(Product, pipeline);
```

---

## Performance Tips

### 1. Use Indexes

Ensure you have indexes on fields used in `Match` and `Sort` stages:

```typescript
// MongoDB index creation
db.products.createIndex({ category: 1, price: 1 });
db.products.createIndex({ createdAt: -1 });

// Then use in pipeline
const pipeline = new PipelineBuilder('indexed-pagination')
  .Match($Expression($Equal('$category', 'Electronics')))
  .Sort({ createdAt: -1 })
  .Paging(20, 1)
  .build();
```

### 2. Project Early

Remove unnecessary fields before pagination to reduce memory usage:

```typescript
import { ProjectOnlyHelper } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('efficient-pagination')
  .Match($Expression($Equal('$status', 'active')))
  .Project(ProjectOnlyHelper('name', 'price', 'category')) // ✅ Project early
  .Sort({ price: -1 })
  .Paging(20, 1)
  .build();
```

### 3. Avoid Deep Pagination

For large datasets, deep pagination (high page numbers) can be slow. Consider:

- Using cursor-based pagination for infinite scroll
- Implementing "Load More" instead of numbered pages
- Setting a maximum page limit

```typescript
const MAX_PAGE = 100;

function buildPaginationPipeline(page: number, limit: number) {
  if (page > MAX_PAGE) {
    throw new Error(`Page number cannot exceed ${MAX_PAGE}`);
  }
  
  return new PipelineBuilder('limited-pagination')
    .Match($Expression($Equal('$status', 'active')))
    .Sort({ createdAt: -1 })
    .Paging(limit, page)
    .build();
}
```

### 4. Limit Lookup Results

When using lookups with pagination, consider limiting the joined documents:

```typescript
const pipeline = new PipelineBuilder('efficient-lookup-pagination')
  .Lookup({
    from: 'orders',
    let: { userId: '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
      { $sort: { createdAt: -1 } },
      { $limit: 10 } // ✅ Limit joined documents
    ],
    as: 'recentOrders'
  })
  .Paging(20, 1)
  .build();
```

### 5. Use Covered Queries

If possible, use covered queries where all fields are in the index:

```typescript
// Index: { status: 1, name: 1, price: 1 }

const pipeline = new PipelineBuilder('covered-query')
  .Match($Expression($Equal('$status', 'active')))
  .Project(ProjectOnlyHelper('name', 'price')) // Only indexed fields
  .Sort({ name: 1 })
  .Paging(20, 1)
  .build();
```

---

## Complete Example: E-commerce Product Listing

```typescript
import { PipelineBuilder, GetPagingResult } from 'mongodb-pipeline-builder';
import { 
  ProjectOnlyHelper, 
  LookupEqualityHelper, 
  Field 
} from 'mongodb-pipeline-builder/helpers';
import { 
  $Expression, 
  $And, 
  $Equal, 
  $GreaterThanEqual,
  $LessThanEqual,
  $ArrayElementAt,
  $Size
} from 'mongodb-pipeline-builder/operators';

interface ProductListingFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

interface ProductListing {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  seller: {
    name: string;
    rating: number;
  };
}

async function getProducts(
  page: number,
  itemsPerPage: number,
  filters: ProductListingFilters,
  sortBy: { field: string; order: 1 | -1 }
) {
  const builder = new PipelineBuilder('product-listing');
  
  // Build match conditions
  const matchConditions: any[] = [];
  
  if (filters.category) {
    matchConditions.push($Equal('$category', filters.category));
  }
  
  if (filters.minPrice !== undefined) {
    matchConditions.push($GreaterThanEqual('$price', filters.minPrice));
  }
  
  if (filters.maxPrice !== undefined) {
    matchConditions.push($LessThanEqual('$price', filters.maxPrice));
  }
  
  if (filters.inStock !== undefined) {
    matchConditions.push($Equal('$inStock', filters.inStock));
  }
  
  // Apply filters
  if (matchConditions.length > 0) {
    builder.Match($Expression(
      matchConditions.length === 1 
        ? matchConditions[0] 
        : $And(...matchConditions)
    ));
  }
  
  // Join with sellers
  builder.Lookup(LookupEqualityHelper('sellers', 'seller', 'sellerId', '_id'));
  
  // Join with reviews
  builder.Lookup(LookupEqualityHelper('reviews', 'reviews', '_id', 'productId'));
  
  // Add computed fields
  builder.AddFields(
    Field('reviewCount', $Size('$reviews')),
    Field('seller', $ArrayElementAt('$seller', 0))
  );
  
  // Project needed fields
  builder.Project(
    ProjectOnlyHelper(
      'name',
      'description',
      'price',
      'category',
      'imageUrl',
      'rating',
      'reviewCount'
    ),
    Field('seller.name', 1),
    Field('seller.rating', 1)
  );
  
  // Apply sorting
  builder.Sort({ [sortBy.field]: sortBy.order });
  
  // Apply pagination
  builder.Paging(itemsPerPage, page);
  
  // Execute pipeline
  const result = await GetPagingResult<ProductListing>(Product, builder.build());
  
  return {
    products: result.GetDocs(),
    pagination: {
      currentPage: page,
      itemsPerPage: itemsPerPage,
      totalItems: result.GetCount(),
      totalPages: result.GetTotalPageNumber(),
      hasNextPage: page < result.GetTotalPageNumber(),
      hasPreviousPage: page > 1
    }
  };
}

// Usage
const result = await getProducts(
  1,                          // page 1
  24,                         // 24 items per page
  {
    category: 'Electronics',
    minPrice: 100,
    maxPrice: 1000,
    inStock: true
  },
  { field: 'rating', order: -1 }
);

console.log(result.products);      // ProductListing[]
console.log(result.pagination);    // Pagination metadata
```

---

## Summary

Key takeaways for pagination:

1. ✅ Use the `Paging` stage for offset-based pagination
2. ✅ Always filter and sort before paginating
3. ✅ Use `GetPagingResult` for paginated queries
4. ✅ Add indexes on filtered and sorted fields
5. ✅ Project early to reduce memory usage
6. ✅ Consider cursor-based pagination for large datasets
7. ✅ Set reasonable limits on page numbers and items per page

---

## Related Documentation

- [Getting Started](../getting-started.md)
- [Lookup Examples](./lookups.md)
- [Complex Aggregations](./aggregations.md)
- [Pipeline Stages API](../api/stages.md)

