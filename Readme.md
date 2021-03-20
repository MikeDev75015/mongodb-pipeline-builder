<p style="text-align: center; width: 100%;">

[![CircleCI](https://circleci.com/gh/MikeDev75015/mongodb-pipeline-builder.svg?style=shield)](https://app.circleci.com/pipelines/github/MikeDev75015/mongodb-pipeline-builder)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=alert_status)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=security_rating)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=coverage)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=ncloc)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=code_smells)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=sqale_index)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=bugs)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=MikeDev75015_mongodb-pipeline-builder&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=MikeDev75015_mongodb-pipeline-builder)

# `mongodb-pipeline-builder`

## <span style="display: block; font-weight: bold; whitespace: nowrap;">[ pre-release ]</span>

</p>

<p style="text-align: justify; width: 100%;font-size: 15px;">
is a pipeline builder for the db.collection.aggregate method and db.aggregate method. It will simplify pipelines by making them more
readable and much easier to edit. It also allows you to test your pipelines on a dataset in order to verify them. Pipeline stages appear in an array. Documents pass
through the stages in sequence.
</p>

## npm package <img src="https://pbs.twimg.com/media/EDoWJbUXYAArclg.png" width="24" height="24" />

### npm i mongodb-pipeline-builder@latest --save

## Usage

<p style="font-size: 15px;">
import { PipelineBuilder } from 'mongodb-pipeline-builder';<br>
import { Expression } from 'mongodb-pipeline-builder/helpers/match';<br>
import { EqualityPayload } from 'mongodb-pipeline-builder/helpers/lookup';<br>
import { Only } from 'mongodb-pipeline-builder/helpers/project';<br>
import { Equal } from 'mongodb-pipeline-builder/operators/comparison';<br>
import { List } from 'mongodb-pipeline-builder/helpers/common';<br>
</p>

<p style="font-size: 15px;">
const myNewPipeline = new PipelineBuilder('name-of-my-new-pipeline')<br>
&nbsp;&nbsp;&nbsp;&nbsp;.Match( Expression( Equal( '$id' , 'userId' ) ) )<br>
&nbsp;&nbsp;&nbsp;&nbsp;.Lookup( EqualityPayload( from, as, localField, foreignField ) )<br>
&nbsp;&nbsp;&nbsp;&nbsp;.Project( Only( 'firstname', 'lastname' ) )<br>
&nbsp;&nbsp;&nbsp;&nbsp;.Unset( List( 'as' ) )<br>
&nbsp;&nbsp;&nbsp;&nbsp;.getPipeline();
</p>

<p>
*** If no helper is available for a stage, use its method and pass it a valid value as a parameter.
</p>

### is equivalent to:

<p style="font-size: 15px;">
const myNewPipeline = [<br>
&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$match:&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$expr:&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$eq:&nbsp;[<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'$id',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'userId'<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$lookup:&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from:&nbsp;'from',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localField:&nbsp;'localField',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foreignField:&nbsp;'foreignField'<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;as:&nbsp;'as',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$project:&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_id:&nbsp;0,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;firstname:&nbsp;1,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastname:&nbsp;1<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$unset:&nbsp;[<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'as'<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>
];<br>
</p>

### Soon more complex examples will be available!

<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/" target="_blank">Aggregation Pipeline Stages</a> ]</p>

<p style="font-size: 15px;">
AddFields | Bucket | BucketAuto | CollStats | Count | Facet | GeoNear | GraphLookup | Group | IndexStats | Limit | ListSessions | Lookup | Match | Merge | Out | PlanCacheStats | Project | Redact | ReplaceRoot | ReplaceWith | Sample | Search | Set | Skip | Sort | SortByCount | UnionWith | Unset | Unwind
</p>

<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/" target="_blank">Aggregation Pipeline Helpers</a> ]</p>

<p style="font-size: 15px;">
Lookup( ConditionPayload | EqualityPayload )<br>
Match( Expression | Field | 'any valid read operation request syntax' )<br>
Project( Only | Ignore )<br>
Unset( List )
</p>

<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/" target="_blank">Aggregation Pipeline Operators</a> ]</p>

<p style="font-size: 15px;">
Absolute | Accumulator | Acos | Acosh | Add | AddToSet | AllElementsTrue | And | AnyElementTrue | ArrayElemAt | ArrayToObject | Asin | Asinh | Atan | Atan2 | Atanh | Avg | BinarySize | BsonSize | Ceil | Compare | Concat | ConcatArrays | Cond | Convert | Cos | Cosh | DateFromParts | DateFromString | DateToParts | DateToString | DayOfMonth | DayOfWeek | DayOfYear | DegreesToRadians | Divide | Equal | Exponent | Filter | First | Floor | FunctionOperator | GreaterThan | GreaterThanEqual | Hour | IfNull | Ignore | In | IndexOfArray | IndexOfBytes | IndexOfCP | IsArray | IsNumber | IsoDayOfWeek | IsoWeek | IsoWeekYear | Last | LessThan | LessThanEqual | Let | Literal | Log | Log10 | Ltrim | MapOperator | Max | MergeObjects | Meta | Millisecond | Min | Minute | Mod | Month | Multiply | NaturalLog | Not | NotEqual | ObjectToArray | Only | Or | Pow | Push | RadiansToDegrees | Rand | Range | Reduce | RegexFind | RegexFindAll | RegexMatch | ReplaceAll | ReplaceOne | ReverseArray | Round | Rtrim | SampleRate | Second | SetDifference | SetEquals | SetIntersection | SetIsSubset | SetUnion | Sin | Sinh | Size | Slice | Split | Sqrt | StdDevPop | StdDevSamp | StrCaseCmp | StrLenBytes | StrLenCP | Substr | SubstrBytes | SubstrCP | Subtract | Sum | Switch | Tan | Tanh | ToBool | ToDate | ToDecimal | ToDouble | ToInt | ToLong | ToLower | ToObjectId | ToString | ToUpper | Trim | Trunc | Type | Week | Year | Zip"
</p>





