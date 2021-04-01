<div style="text-align: center; width: 100%;">

<div style="display: inline-block">

[![NPM version](https://img.shields.io/npm/v/mongodb-pipeline-builder.svg)](https://www.npmjs.com/package/mongodb-pipeline-builder)
![NPM](https://img.shields.io/npm/l/mongodb-pipeline-builder?registry_uri=https%3A%2F%2Fregistry.npmjs.com)
![npm](https://img.shields.io/npm/dw/mongodb-pipeline-builder)
</div>

<div style="display: inline-block">

![GitHub branch checks state](https://img.shields.io/github/checks-status/MikeDev75015/mongodb-pipeline-builder/main)
[![CircleCI](https://circleci.com/gh/MikeDev75015/mongodb-pipeline-builder.svg?style=shield)](https://app.circleci.com/pipelines/github/MikeDev75015/mongodb-pipeline-builder)
![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)
</div>
</div>

<div style="text-align: center; width: 100%;">
<div style="display: inline-block">

![Sonar Tests](https://img.shields.io/sonar/tests/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Coverage](https://img.shields.io/sonar/coverage/MikeDev75015_mongodb-pipeline-builder?server=https%3A%2F%2Fsonarcloud.io)
<img src="https://mikedev75015.github.io/mongodb-pipeline-builder/images/coverage-badge-documentation.svg" alt="documentation-badge">
</div>

<div style="display: inline-block">

![GitHub top language](https://img.shields.io/github/languages/top/MikeDev75015/mongodb-pipeline-builder)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=ncloc)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
</div>
</div>

<div style="text-align: center; width: 100%;">
<div style="display: inline-block">

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/MikeDev75015/mongodb-pipeline-builder)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/MikeDev75015/mongodb-pipeline-builder)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/MikeDev75015/mongodb-pipeline-builder/main)
</div>

<div style="display: inline-block">

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=security_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
</div>
</div>

<div style="text-align: center; width: 100%;">

# `mongodb-pipeline-builder`

</div>

<a id="doc-link" style="display: block; cursor: pointer;" href="https://mikedev75015.github.io/mongodb-pipeline-builder" target="_blank">Technical documentation</a>

<p style="text-align: justify; width: 100%;font-size: 15px;">
is a pipeline builder for the db.collection.aggregate method and db.aggregate method. It will simplify pipelines by making them more
readable and much easier to edit. It also allows you to test your pipelines on a dataset in order to verify them. Pipeline stages appear in an array. Documents pass
through the stages in sequence.
</p>

## `npm package` <img src="https://pbs.twimg.com/media/EDoWJbUXYAArclg.png" width="24" height="24" />

### `npm i mongodb-pipeline-builder@latest --save`

## Usage:


### - with require

```typescript
const PipelineBuilder = require("mongodb-pipeline-builder").PipelineBuilder;
const { EqualityPayload, OnlyPayload, Field } = require('mongodb-pipeline-builder/helpers');
const { LessThanEqual, ArrayElemAt, Equal, Expression } = require('mongodb-pipeline-builder/operators');
```

### - with import


```typescript
import { PipelineBuilder } from 'mongodb-pipeline-builder';
import { EqualityPayload, OnlyPayload, Field } from 'mongodb-pipeline-builder/helpers';
import { LessThanEqual, ArrayElemAt, Equal, Expression } from 'mongodb-pipeline-builder/operators';
```

## `Example with paging:`


```typescript
const myNewPipeline = new PipelineBuilder( 'myPagination', { debug: true } )
                        .Match( Expression( LessThanEqual( '$id', 20 ) ) )
                        .Project( OnlyPayload( 'name', 'weight' ) )
                        .Paging( 5, 3 ) // 5 per page, page 3
                        .getPipeline();
```

### is equivalent to:


```typescript
const myNewPipeline = [
  {
    $facet: {
      docs: [
        {
          $match: {
            $expr: {
              $lte: ["$id", 20]
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            weight: 1
          }
        },
        {
          $skip: 10
        },
        {
          $limit: 5
        }
      ],
      count: [
        {
          $match: {
            $expr: {
              $lte: ["$id", 20]
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            weight: 1
          }
        },
        {
          $count: "totalElements"
        }
      ]
    }
  }
];

```

## Example without paging:


```typescript
const myNewPipeline = new PipelineBuilder('user-skills')
	.Match(Expression(Equal('$id', 123456)))
	.Lookup(EqualityPayload('profiles', 'profile', 'profileId', 'id'))
	.Project(OnlyPayload('firstname', 'lastname', 'email'))
	.AddFields(
		Field('skills', ArrayElemAt('$profile.skills', 0)),
		Field('availability', ArrayElemAt('$profile.availability', 0))
	)
	.Unset('profile')
	.getPipeline();
```

### is equivalent to:

```typescript
const myNewPipeline = [
  {
    $match: {
      $expr: {
        $eq: ["$id", 123456]
      }
    }
  },
  {
    $lookup: {
      from: "profiles",
      as: "profile",
      localField: "profileId",
      foreignField: "id"
    }
  },
  {
    $project: {
      _id: 0,
      firstname: 1,
      lastname: 1,
      email: 1
    }
  },
  {
    $addFields: {
      skills: { $arrayElemAt["$profile.skills", 0] },
      availability: { $arrayElemAt["$profile.availability", 0] }
    }
  },
  {
    $unset: "profile"
  }
];

```

## GetResult()

<p style="font-size: 15px;">
is an asynchronous method that provides a very easy way to use your aggregation pipelines on a target (collection or mongoose model having the aggregation method) with or without paging.</p>

### Example :
`const result = await GetResult( target, pipeline );`
<p style="font-size: 15px;">
Then you will have access to:<br>
&nbsp;- result.GetDocs(); to get the documents found.<br>
&nbsp;- result.GetCount(); to get the total number of documents found. Often useful when paging with partial results.
</p>

### Or :
```typescript
GetResult(target, pipeline)
	.then(result => {
		result.GetDocs();
		result.GetCount();
	});
```


### [ <a href="https://npm.runkit.com/mongodb-pipeline-builder" target="_blank">Try on NPM RunKit with require method</a> ]<br>

<br>
<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/" target="_blank">Aggregation Pipeline Stages</a> ]</p>

<p style="font-size: 15px;">
MONGODB STAGES:<br>
AddFields | Bucket | BucketAuto | CollStats | Count | Facet | GeoNear | GraphLookup | Group | IndexStats | Limit | ListSessions | Lookup | Match | Merge | Out | PlanCacheStats | Project | Redact | ReplaceRoot | ReplaceWith | Sample | Search | Set | Skip | Sort | SortByCount | UnionWith | Unset | Unwind<br><br>
CUSTOM STAGE:<br>
Paging
</p>

<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/" target="_blank">Aggregation Pipeline Helpers</a> ]</p>

<p style="font-size: 15px;">
STAGE HELPERS * :<br>
&nbsp;- Bucket ( GroupByPayload )<br>
&nbsp;- BucketAuto ( GroupByAutoPayload )<br>
&nbsp;- CurrentOp ( OpPayload )<br>
&nbsp;- GeoNear ( NearPayload )<br>
&nbsp;- Lookup ( ConditionPayload | EqualityPayload )<br>
&nbsp;- Merge ( IntoPayload )<br>
&nbsp;- Out ( DbCollPayload )<br>
&nbsp;- Project ( IgnorePayload | OnlyPayload )<br>
&nbsp;- Sample ( SizePayload )<br>
&nbsp;- UnionWith ( CollectionPayload )<br><br>
COMMON HELPERS:<br>
&nbsp;- Field >> AddFields( Field ** ) | Set( Field ** ) | Sort( Field ** )<br>
&nbsp;- List<br><br>
* If no helper is available for a stage, use its method and pass it a valid value as a parameter.<br>
** One or more separated by a comma.
</p>

<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/" target="_blank">Aggregation Pipeline Operators</a> ]</p>

<p style="font-size: 15px;">
Absolute | Accumulator | Acos | Acosh | Add | AddToSet | AllElementsTrue | And | AnyElementTrue | ArrayElemAt | ArrayToObject | Asin | Asinh | Atan | Atan2 | Atanh | Avg | BinarySize | BsonSize | Ceil | Compare | Concat | ConcatArrays | Cond | Convert | Cos | Cosh | DateFromParts | DateFromString | DateToParts | DateToString | DayOfMonth | DayOfWeek | DayOfYear | DegreesToRadians | Divide | Equal | Exponent | Expression | Filter | First | Floor | FunctionOperator | GreaterThan | GreaterThanEqual | Hour | IfNull | In | IndexOfArray | IndexOfBytes | IndexOfCP | IsArray | IsNumber | IsoDayOfWeek | IsoWeek | IsoWeekYear | Last | LessThan | LessThanEqual | Let | Literal | Log | Log10 | Ltrim | MapOperator | Max | MergeObjects | Meta | Millisecond | Min | Minute | Mod | Month | Multiply | NaturalLog | Not | NotEqual | ObjectToArray | Or | Pow | Push | RadiansToDegrees | Rand | Range | Reduce | RegexFind | RegexFindAll | RegexMatch | ReplaceAll | ReplaceOne | ReverseArray | Round | Rtrim | SampleRate | Second | SetDifference | SetEquals | SetIntersection | SetIsSubset | SetUnion | Sin | Sinh | Size | Slice | Split | Sqrt | StdDevPop | StdDevSamp | StrCaseCmp | StrLenBytes | StrLenCP | Substr | SubstrBytes | SubstrCP | Subtract | Sum | Switch | Tan | Tanh | ToBool | ToDate | ToDecimal | ToDouble | ToInt | ToLong | ToLower | ToObjectId | ToString | ToUpper | Trim | Trunc | Type | Week | Year | Zip
</p>
<br><br><br><br>



