<p style="text-align: center; width: 100%;">

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

# `mongodb-pipeline-builder` <span style="display: inline-block; font-size: 20px; whitespace: nowrap;">[ pre-release ]</span>
</p>

<p style="text-align: justify; width: 100%;">
is a pipeline builder for the aggregate method of a mongoDB collection. It will simplify pipelines by making them more
readable and much easier to edit. It also allows you to test your pipelines on a dataset in order to verify them.
</p>

## npm package <img src="https://pbs.twimg.com/media/EDoWJbUXYAArclg.png" width="24" height="24" />

### npm i mongodb-pipeline-builder@latest

## Usage

<p style="font-size: 16px;">
import { PipelineBuilder } from 'mongodb-pipeline-builder/dist';<br>
import { Expression } from 'mongodb-pipeline-builder/dist/operators/misc';<br>
import { Equal } from 'mongodb-pipeline-builder/dist/operators/comparison';<br>
</p>

<p style="font-size: 16px;">
const myNewPipeline = new PipelineBuilder('name-of-my-new-pipeline')<br>
&nbsp;&nbsp;&nbsp;&nbsp;.addStage( 'match' , Expression( Equal( '$id' , 'userId' ) ) )<br>
&nbsp;&nbsp;&nbsp;&nbsp;.addStage( 'project' , { _id: 0, firstname: 1, lastname: 1 } )<br>
&nbsp;&nbsp;&nbsp;&nbsp;.getPipeline();
</p>

### Soon more complex examples will be available!
<p>
In the db.collection.aggregate method and db.aggregate method, pipeline stages appear in an array. Documents pass
through the stages in sequence.
</p>

<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/" target="_blank">Aggregation Pipeline Stages</a> ]</p>

<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/" target="_blank">Aggregation Pipeline Operators</a> ]</p>


