# Examples and Tutorials

Collection of practical examples and tutorials for MongoDB Pipeline Builder.

## 📚 Available Examples

### 📄 [Pagination](./pagination.md)
Learn how to implement pagination in your MongoDB pipelines.

**Topics covered:**
- Simple pagination with `Paging()`
- Using `GetPagingResult()`
- Pagination with filters and sorting
- Managing paginated results
- Calculating total number of pages
- Pagination best practices

**Use cases:**
- REST APIs with pagination
- User interfaces with paginated tables
- Progressive data loading
- Performance optimization for large collections

---

### 🔗 [Lookups and Joins](./lookups.md)
Complete guide to perform joins between MongoDB collections.

**Topics covered:**
- Simple equality joins with `LookupEqualityHelper`
- Complex joins with `LookupConditionHelper`
- Multiple joins
- Joins with sub-pipelines
- Unwinding results with `Unwind`
- Join performance optimization
- Denormalization patterns

**Use cases:**
- User-order relationships
- Organizational hierarchies
- Relationship graphs
- Data enrichment
- Reference resolution

---

## 🎯 Examples by Use Case

### E-Commerce

#### Orders with User Details
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { LookupEqualityHelper, ProjectOnlyHelper, Field } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('orders-with-users')
  .Match(Field('status', 'completed'))
  .Lookup(LookupEqualityHelper('users', 'user', 'userId', '_id'))
  .Unwind({ path: '$user' })
  .Lookup(LookupEqualityHelper('products', 'productDetails', 'items.productId', '_id'))
  .Project(ProjectOnlyHelper('orderNumber', 'total', 'user.name', 'user.email', 'productDetails'))
  .Sort(Field('createdAt', -1))
  .build();
```

#### Sales Analysis by Category
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { BucketHelper } from 'mongodb-pipeline-builder/helpers';
import { $Sum, $Avg, $Min, $Max } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('sales-by-category')
  .Match({ year: 2024 })
  .Group({
    _id: '$category',
    totalSales: $Sum('$amount'),
    avgOrderValue: $Avg('$amount'),
    minOrder: $Min('$amount'),
    maxOrder: $Max('$amount'),
    orderCount: $Sum(1)
  })
  .Sort({ totalSales: -1 })
  .build();
```

---

### IoT and Time Series

#### Sensor Data with Interpolation
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { DensifyHelper, FillHelper, Field } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('sensor-data-interpolated')
  .Match(Field('sensorId', 'SENSOR_001'))
  // Fill missing timestamps (every 5 minutes)
  .Densify(DensifyHelper(
    'timestamp',
    { bounds: 'full', step: 5, unit: 'minute' }
  ))
  // Interpolate missing values
  .Fill(FillHelper(
    {
      temperature: { method: 'linear' },
      humidity: { method: 'locf' }
    },
    { sortBy: { timestamp: 1 } }
  ))
  .Project({
    timestamp: 1,
    temperature: 1,
    humidity: 1,
    sensorId: 1
  })
  .build();
```

---

### Geolocation

#### Nearby Restaurants with Reviews
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { GeoNearHelper, LookupConditionHelper, Field } from 'mongodb-pipeline-builder/helpers';

const userLocation = [-73.99279, 40.719296]; // [longitude, latitude]

const pipeline = new PipelineBuilder('nearby-restaurants')
  .GeoNear(GeoNearHelper(
    { type: 'Point', coordinates: userLocation },
    'distance',
    {
      maxDistance: 5000,  // 5 km
      spherical: true,
      query: { type: 'restaurant', isOpen: true }
    }
  ))
  // Enrich with recent reviews
  .Lookup(LookupConditionHelper(
    'reviews',
    'recentReviews',
    {
      let: { restaurantId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$restaurantId', '$$restaurantId'] } } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 }
      ]
    }
  ))
  .AddFields(
    Field('avgRating', { $avg: '$recentReviews.rating' }),
    Field('distanceKm', { $divide: ['$distance', 1000] })
  )
  .Sort(Field('distance', 1))
  .Limit(20)
  .build();
```

---

### Analytics and Reporting

#### User Dashboard
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { Field } from 'mongodb-pipeline-builder/helpers';
import { $Sum, $Avg } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('user-dashboard')
  .Match(Field('userId', userId))
  .Facet(
    Field('orderStats', [
      { $group: { 
        _id: null, 
        totalOrders: $Sum(1),
        totalSpent: $Sum('$amount'),
        avgOrderValue: $Avg('$amount')
      }}
    ]),
    Field('recentOrders', [
      { $sort: { createdAt: -1 } },
      { $limit: 10 }
    ]),
    Field('ordersByMonth', [
      { $group: {
        _id: { $month: '$createdAt' },
        count: $Sum(1),
        total: $Sum('$amount')
      }},
      { $sort: { _id: 1 } }
    ])
  )
  .build();
```

---

### Full-Text Search

#### Product Search with Facets
```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { SearchHelper, Field } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('product-search')
  .Search(SearchHelper({
    compound: {
      must: [
        { text: { query: searchTerm, path: ['name', 'description'] } }
      ],
      filter: [
        { range: { path: 'price', gte: minPrice, lte: maxPrice } }
      ]
    }
  }))
  .Facet(
    Field('results', [
      { $limit: 20 }
    ]),
    Field('priceRanges', [
      { 
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 50, 100, 200, 500, 1000],
          default: 'Premium'
        }
      }
    ]),
    Field('categories', [
      { $sortByCount: '$category' }
    ])
  )
  .build();
```

---

## 🔍 Common Patterns

### Pattern: Data Enrichment

Add reference data to your documents:

```typescript
const pipeline = new PipelineBuilder('enrich-orders')
  // Base document
  .Match(Field('status', 'pending'))
  
  // Add user info
  .Lookup(LookupEqualityHelper('users', 'userInfo', 'userId', '_id'))
  .AddFields(Field('user', { $arrayElemAt: ['$userInfo', 0] }))
  .Unset('userInfo')
  
  // Add product info
  .Lookup(LookupEqualityHelper('products', 'productInfo', 'productId', '_id'))
  .AddFields(Field('product', { $arrayElemAt: ['$productInfo', 0] }))
  .Unset('productInfo')
  
  .build();
```

### Pattern: Multi-Level Aggregation

Calculate statistics at multiple levels:

```typescript
const pipeline = new PipelineBuilder('multi-level-stats')
  // Level 1: Stats per product
  .Group({
    _id: { category: '$category', product: '$productId' },
    productSales: $Sum('$amount'),
    productOrders: $Sum(1)
  })
  
  // Level 2: Stats per category
  .Group({
    _id: '$_id.category',
    products: { $push: { product: '$_id.product', sales: '$productSales' } },
    categorySales: $Sum('$productSales'),
    categoryOrders: $Sum('$productOrders')
  })
  
  // Level 3: Global stats
  .Group({
    _id: null,
    categories: { $push: '$$ROOT' },
    totalSales: $Sum('$categorySales'),
    totalOrders: $Sum('$categoryOrders')
  })
  
  .build();
```

### Pattern: Controlled Denormalization

Optimize reads with denormalization:

```typescript
const pipeline = new PipelineBuilder('denormalize-user-data')
  .Match(Field('userId', userId))
  
  // Retrieve all related data
  .Lookup(LookupEqualityHelper('profiles', 'profile', 'profileId', '_id'))
  .Lookup(LookupEqualityHelper('preferences', 'preferences', '_id', 'userId'))
  .Lookup(LookupEqualityHelper('subscriptions', 'subscriptions', '_id', 'userId'))
  
  // Flatten structure
  .AddFields(
    Field('profile', { $arrayElemAt: ['$profile', 0] }),
    Field('preferences', { $arrayElemAt: ['$preferences', 0] })
  )
  
  // Create denormalized document
  .ReplaceWith({
    _id: '$_id',
    email: '$email',
    name: '$profile.name',
    avatar: '$profile.avatar',
    theme: '$preferences.theme',
    language: '$preferences.language',
    subscriptions: '$subscriptions'
  })
  
  .build();
```

---

## 💡 Performance Tips

### 1. Appropriate Indexes
Make sure you have indexes on fields used in `Match` and `Sort`:

```typescript
// ✅ Good - Match first with index
.Match(Field('status', 'active'))  // Index on 'status'
.Sort(Field('createdAt', -1))      // Index on 'createdAt'
.Limit(100)

// ❌ Avoid - Sort without index before Match
.Sort(Field('createdAt', -1))
.Match(Field('status', 'active'))
```

### 2. Limit Early
Limit results as early as possible:

```typescript
// ✅ Good
.Match(Field('category', 'electronics'))
.Limit(100)
.Lookup(...)  // Only 100 lookups

// ❌ Avoid
.Lookup(...)  // Lookup on all documents
.Match(Field('category', 'electronics'))
.Limit(100)
```

### 3. Project Only What's Necessary
Reduce document size passed between stages:

```typescript
// ✅ Good
.Match(Field('active', true))
.Project(ProjectOnlyHelper('_id', 'name', 'email'))  // Reduce size
.Lookup(...)

// ❌ Avoid - Pass all fields
.Match(Field('active', true))
.Lookup(...)
.Project(ProjectOnlyHelper('name', 'email'))
```

---

## 📖 Additional Resources

- **[API Reference](../api/README.md)** - Complete API documentation
- **[Stages](../api/stages.md)** - All aggregation stages
- **[Operators](../api/operators.md)** - All operators
- **[Helpers](../api/helpers.md)** - All utility helpers
- **[Getting Started](../getting-started.md)** - Getting started guide
- **[MongoDB Aggregation Docs](https://docs.mongodb.com/manual/aggregation/)** - Official MongoDB documentation

---

## 🤝 Contributing

Have an interesting example to share? Feel free to contribute!

1. Fork the project
2. Create your branch (`git checkout -b feature/amazing-example`)
3. Add your example in `docs/examples/`
4. Commit your changes (`git commit -m 'Add amazing example'`)
5. Push to the branch (`git push origin feature/amazing-example`)
6. Open a Pull Request


