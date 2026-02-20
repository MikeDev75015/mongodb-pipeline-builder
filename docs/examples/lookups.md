# Lookup & Join Examples

This guide demonstrates various patterns for joining collections using MongoDB's `$lookup` stage with the Pipeline Builder.

## Table of Contents

- [Basic Lookups](#basic-lookups)
- [Lookup with Conditions](#lookup-with-conditions)
- [Multiple Lookups](#multiple-lookups)
- [Nested Lookups](#nested-lookups)
- [Lookup with Unwinding](#lookup-with-unwinding)
- [Advanced Patterns](#advanced-patterns)
- [Performance Optimization](#performance-optimization)

---

## Basic Lookups

### Simple Equality Lookup

The most common lookup pattern - joining two collections on matching fields:

```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { LookupEqualityHelper } from 'mongodb-pipeline-builder/helpers';

// Join users with their profiles
const pipeline = new PipelineBuilder('users-with-profiles')
  .Lookup(LookupEqualityHelper(
    'profiles',      // from collection
    'profile',       // output field name
    'profileId',     // local field
    '_id'            // foreign field
  ))
  .build();
```

**Generated Pipeline:**
```typescript
[
  {
    $lookup: {
      from: 'profiles',
      localField: 'profileId',
      foreignField: '_id',
      as: 'profile'
    }
  }
]
```

**Input Document:**
```json
{
  "_id": 1,
  "name": "John Doe",
  "profileId": 101
}
```

**Output Document:**
```json
{
  "_id": 1,
  "name": "John Doe",
  "profileId": 101,
  "profile": [
    { "_id": 101, "bio": "Software Developer", "avatar": "avatar.jpg" }
  ]
}
```

### Extract First Match

Usually you want the first (or only) match from the lookup array:

```typescript
import { $ArrayElementAt } from 'mongodb-pipeline-builder/operators';
import { Field } from 'mongodb-pipeline-builder/helpers';

const pipeline = new PipelineBuilder('user-with-profile')
  .Lookup(LookupEqualityHelper('profiles', 'profile', 'profileId', '_id'))
  .AddFields(
    Field('profile', $ArrayElementAt('$profile', 0)) // Get first element
  )
  .build();
```

**Output Document:**
```json
{
  "_id": 1,
  "name": "John Doe",
  "profileId": 101,
  "profile": { "_id": 101, "bio": "Software Developer", "avatar": "avatar.jpg" }
}
```

---

## Lookup with Conditions

### Conditional Lookup (Pipeline Syntax)

Use `LookupConditionHelper` for more complex joins with conditions:

```typescript
import { LookupConditionHelper } from 'mongodb-pipeline-builder/helpers';
import { $Expression, $And, $Equal, $GreaterThan } from 'mongodb-pipeline-builder/operators';

// Join orders but only recent ones
const pipeline = new PipelineBuilder('users-with-recent-orders')
  .Lookup({
    from: 'orders',
    let: { userId: '$_id' },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ['$userId', '$$userId'] },
              { $gte: ['$createdAt', new Date('2024-01-01')] }
            ]
          }
        }
      },
      { $sort: { createdAt: -1 } },
      { $limit: 10 }
    ],
    as: 'recentOrders'
  })
  .build();
```

### Lookup with Multiple Conditions

```typescript
const pipeline = new PipelineBuilder('active-user-orders')
  .Lookup({
    from: 'orders',
    let: { 
      userId: '$_id',
      userStatus: '$status'
    },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ['$userId', '$$userId'] },
              { $eq: ['$$userStatus', 'active'] },
              { $eq: ['$status', 'completed'] }
            ]
          }
        }
      }
    ],
    as: 'completedOrders'
  })
  .build();
```

---

## Multiple Lookups

### Sequential Lookups

Join multiple collections one after another:

```typescript
import { LookupEqualityHelper, ProjectOnlyHelper, Field } from 'mongodb-pipeline-builder/helpers';
import { $ArrayElementAt, $Size } from 'mongodb-pipeline-builder/operators';

interface UserWithDetails {
  name: string;
  email: string;
  profile: {
    bio: string;
    avatar: string;
  };
  orderCount: number;
  subscription: {
    plan: string;
    expiresAt: Date;
  };
}

const pipeline = new PipelineBuilder('user-complete-details')
  // Lookup profile
  .Lookup(LookupEqualityHelper('profiles', 'profileData', '_id', 'userId'))
  
  // Lookup orders
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  
  // Lookup subscription
  .Lookup(LookupEqualityHelper('subscriptions', 'subscription', '_id', 'userId'))
  
  // Transform the data
  .AddFields(
    Field('profile', $ArrayElementAt('$profileData', 0)),
    Field('orderCount', $Size('$orders')),
    Field('subscription', $ArrayElementAt('$subscription', 0))
  )
  
  // Project final fields
  .Project(
    ProjectOnlyHelper('name', 'email'),
    Field('profile.bio', 1),
    Field('profile.avatar', 1),
    Field('orderCount', 1),
    Field('subscription.plan', 1),
    Field('subscription.expiresAt', 1)
  )
  
  .build();

const result = await GetResult<UserWithDetails>(User, pipeline);
```

### Parallel Lookups with Facet

Use `$facet` to perform multiple independent lookups:

```typescript
const pipeline = new PipelineBuilder('user-analytics')
  .Match($Expression($Equal('$_id', userId)))
  .Facet(
    Field('userData', [
      {
        $lookup: {
          from: 'profiles',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile'
        }
      }
    ]),
    Field('orderData', [
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $addFields: {
          orderCount: { $size: '$orders' },
          totalSpent: { $sum: '$orders.total' }
        }
      }
    ]),
    Field('activityData', [
      {
        $lookup: {
          from: 'activities',
          localField: '_id',
          foreignField: 'userId',
          as: 'activities'
        }
      },
      {
        $addFields: {
          lastActivity: { $arrayElemAt: ['$activities', -1] }
        }
      }
    ])
  )
  .build();
```

---

## Nested Lookups

### Lookup Within Lookup

Join collections in a nested fashion:

```typescript
// Get users with their orders and each order's products
const pipeline = new PipelineBuilder('users-orders-products')
  .Lookup({
    from: 'orders',
    let: { userId: '$_id' },
    pipeline: [
      {
        $match: {
          $expr: { $eq: ['$userId', '$$userId'] }
        }
      },
      {
        $lookup: {
          from: 'products',
          let: { productIds: '$productIds' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$productIds'] }
              }
            }
          ],
          as: 'products'
        }
      },
      {
        $addFields: {
          productCount: { $size: '$products' },
          totalAmount: { $sum: '$products.price' }
        }
      }
    ],
    as: 'orders'
  })
  .build();
```

### Three-Level Nested Lookup

```typescript
// Users -> Orders -> OrderItems -> Products
const pipeline = new PipelineBuilder('deeply-nested-lookup')
  .Lookup({
    from: 'orders',
    let: { userId: '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
      {
        $lookup: {
          from: 'orderItems',
          let: { orderId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$orderId', '$$orderId'] } } },
            {
              $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'product'
              }
            },
            {
              $addFields: {
                product: { $arrayElemAt: ['$product', 0] }
              }
            }
          ],
          as: 'items'
        }
      }
    ],
    as: 'orders'
  })
  .build();
```

---

## Lookup with Unwinding

### Unwind After Lookup

Convert array results to individual documents:

```typescript
const pipeline = new PipelineBuilder('user-order-items')
  // Lookup orders
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  
  // Unwind to get one document per order
  .Unwind({ path: '$orders' })
  
  // Optionally preserve users with no orders
  .Unwind({ 
    path: '$orders', 
    preserveNullAndEmptyArrays: true 
  })
  
  .build();
```

**Before Unwind:**
```json
{
  "_id": 1,
  "name": "John",
  "orders": [
    { "orderId": 101, "total": 50 },
    { "orderId": 102, "total": 75 }
  ]
}
```

**After Unwind:**
```json
[
  {
    "_id": 1,
    "name": "John",
    "orders": { "orderId": 101, "total": 50 }
  },
  {
    "_id": 1,
    "name": "John",
    "orders": { "orderId": 102, "total": 75 }
  }
]
```

### Lookup, Unwind, and Group

Useful for aggregating data from joined collections:

```typescript
import { $Sum, $Average } from 'mongodb-pipeline-builder/operators';

const pipeline = new PipelineBuilder('user-order-stats')
  // Join with orders
  .Lookup(LookupEqualityHelper('orders', 'orders', '_id', 'userId'))
  
  // Unwind orders
  .Unwind({ path: '$orders' })
  
  // Group back to calculate stats
  .Group({
    _id: '$_id',
    name: { $first: '$name' },
    email: { $first: '$email' },
    orderCount: $Sum(1),
    totalSpent: $Sum('$orders.total'),
    averageOrderValue: $Average('$orders.total')
  })
  
  .build();
```

---

## Advanced Patterns

### Self-Referencing Lookup

Join a collection with itself (e.g., for hierarchical data):

```typescript
// Employee hierarchy: employees reporting to managers
const pipeline = new PipelineBuilder('employee-with-manager')
  .Lookup({
    from: 'employees',
    localField: 'managerId',
    foreignField: '_id',
    as: 'manager'
  })
  .AddFields(
    Field('manager', $ArrayElementAt('$manager', 0))
  )
  .build();
```

### Recursive Lookup (Graph Lookup)

For traversing hierarchies or graphs:

```typescript
const pipeline = new PipelineBuilder('employee-hierarchy')
  .GraphLookup({
    from: 'employees',
    startWith: '$managerId',
    connectFromField: 'managerId',
    connectToField: '_id',
    as: 'reportingChain',
    maxDepth: 5,
    depthField: 'level'
  })
  .build();
```

### Lookup with Aggregation

Perform aggregations on joined collections:

```typescript
const pipeline = new PipelineBuilder('users-with-order-summary')
  .Lookup({
    from: 'orders',
    let: { userId: '$_id' },
    pipeline: [
      {
        $match: {
          $expr: { $eq: ['$userId', '$$userId'] }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
          lastOrderDate: { $max: '$createdAt' }
        }
      }
    ],
    as: 'orderSummary'
  })
  .AddFields(
    Field('orderSummary', $ArrayElementAt('$orderSummary', 0))
  )
  .build();
```

### Left Outer Join

Preserve documents even when no match is found:

```typescript
const pipeline = new PipelineBuilder('all-users-with-optional-profile')
  .Lookup(LookupEqualityHelper('profiles', 'profile', '_id', 'userId'))
  .AddFields(
    Field('profile', $ArrayElementAt('$profile', 0))
  )
  // Users without profiles will have profile: null
  .build();

// Or use $ifNull to provide defaults
const pipelineWithDefaults = new PipelineBuilder('users-with-default-profile')
  .Lookup(LookupEqualityHelper('profiles', 'profile', '_id', 'userId'))
  .AddFields(
    Field('profile', $IfNull(
      $ArrayElementAt('$profile', 0),
      { bio: 'No bio provided', avatar: 'default.jpg' }
    ))
  )
  .build();
```

---

## Performance Optimization

### 1. Index Foreign Keys

Always create indexes on foreign key fields:

```typescript
// MongoDB index creation
db.orders.createIndex({ userId: 1 });
db.profiles.createIndex({ userId: 1 });
db.reviews.createIndex({ productId: 1 });
```

### 2. Limit Joined Documents

Reduce memory usage by limiting joined results:

```typescript
const pipeline = new PipelineBuilder('users-with-limited-orders')
  .Lookup({
    from: 'orders',
    let: { userId: '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
      { $sort: { createdAt: -1 } },
      { $limit: 10 } // ✅ Only get last 10 orders
    ],
    as: 'recentOrders'
  })
  .build();
```

### 3. Project Early in Nested Lookups

Remove unnecessary fields early:

```typescript
const pipeline = new PipelineBuilder('optimized-nested-lookup')
  .Lookup({
    from: 'orders',
    let: { userId: '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          pipeline: [
            { $project: { name: 1, price: 1, image: 1 } } // ✅ Only needed fields
          ],
          as: 'product'
        }
      },
      { $project: { _id: 1, total: 1, status: 1, product: 1 } } // ✅ Project early
    ],
    as: 'orders'
  })
  .build();
```

### 4. Use $addFields Instead of $project

When you only need to add fields without removing others:

```typescript
// ❌ Less efficient - rebuilds entire document
.Project({
  name: 1,
  email: 1,
  profile: $ArrayElementAt('$profile', 0)
})

// ✅ More efficient - only adds new field
.AddFields(
  Field('profile', $ArrayElementAt('$profile', 0))
)
```

### 5. Avoid Multiple Lookups When Possible

Sometimes you can use embedded documents instead of lookups:

```typescript
// Instead of this (requires lookup):
// users: { _id, name, addressId }
// addresses: { _id, street, city }

// Consider this (no lookup needed):
// users: { _id, name, address: { street, city } }
```

---

## Complete Example: E-commerce Order Details

```typescript
import { PipelineBuilder, GetResult } from 'mongodb-pipeline-builder';
import { 
  LookupEqualityHelper,
  ProjectOnlyHelper,
  Field 
} from 'mongodb-pipeline-builder/helpers';
import { 
  $Expression,
  $Equal,
  $ArrayElementAt,
  $Size,
  $Sum,
  $Map,
  $Multiply
} from 'mongodb-pipeline-builder/operators';

interface OrderDetails {
  orderNumber: string;
  status: string;
  createdAt: Date;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  summary: {
    itemCount: number;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

async function getOrderDetails(orderId: string) {
  const pipeline = new PipelineBuilder('order-details')
    // Find the specific order
    .Match($Expression($Equal('$_id', orderId)))
    
    // Lookup customer info
    .Lookup(LookupEqualityHelper('users', 'customer', 'userId', '_id'))
    
    // Lookup order items
    .Lookup({
      from: 'orderItems',
      let: { orderId: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$orderId', '$$orderId'] }
          }
        },
        // Lookup product details for each item
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
          $addFields: {
            product: { $arrayElemAt: ['$product', 0] }
          }
        },
        // Project item details
        {
          $project: {
            productName: '$product.name',
            quantity: 1,
            price: '$product.price',
            subtotal: { $multiply: ['$quantity', '$product.price'] }
          }
        }
      ],
      as: 'items'
    })
    
    // Lookup shipping address
    .Lookup(LookupEqualityHelper('addresses', 'address', 'shippingAddressId', '_id'))
    
    // Transform the data
    .AddFields(
      // Extract customer
      Field('customer', $ArrayElementAt('$customer', 0)),
      
      // Extract address
      Field('shippingAddress', $ArrayElementAt('$address', 0)),
      
      // Calculate summary
      Field('summary', {
        itemCount: $Size('$items'),
        subtotal: $Sum('$items.subtotal'),
        tax: '$tax',
        shipping: '$shippingCost',
        total: '$total'
      })
    )
    
    // Project final structure
    .Project(
      ProjectOnlyHelper('orderNumber', 'status', 'createdAt'),
      Field('customer.name', 1),
      Field('customer.email', 1),
      Field('customer.phone', 1),
      Field('items', 1),
      Field('summary', 1),
      Field('shippingAddress.street', 1),
      Field('shippingAddress.city', 1),
      Field('shippingAddress.state', 1),
      Field('shippingAddress.zipCode', 1),
      Field('shippingAddress.country', 1)
    )
    
    .build();
  
  const result = await GetResult<OrderDetails>(Order, pipeline);
  return result.GetElement(0);
}

// Usage
const orderDetails = await getOrderDetails('ORDER-123456');
console.log(orderDetails);
```

---

## Summary

Key takeaways for lookups:

1. ✅ Use `LookupEqualityHelper` for simple equality joins
2. ✅ Use pipeline syntax for complex conditions and filtering
3. ✅ Always index foreign key fields
4. ✅ Limit joined documents when possible
5. ✅ Use `$addFields` + `$arrayElemAt` to extract single results
6. ✅ Consider embedding documents to avoid lookups
7. ✅ Use `$unwind` carefully - it can multiply document count
8. ✅ Project early in nested lookups to reduce memory usage

---

## Related Documentation

- [Getting Started](../getting-started.md)
- [Pagination Examples](./pagination.md)
- [Complex Aggregations](./aggregations.md)
- [Pipeline Stages API](../api/stages.md)

