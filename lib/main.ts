const moment = require('moment-timezone');
import {
    DebugBuildInterface,
    StageErrorInterface,
    StageInterface
} from "./interfaces";
import { PipelineError } from "./errors";
import { LOGS_ENABLED } from './';
import { getStageTypeValueFor } from "./interfaces/stage-type.interface";


/**
 * PipelineBuilder
 */
export class PipelineBuilder {
    /**
     * logsEnabled
     * @private
     */
    private readonly logsEnabled: boolean;
    /**
     * pipelineName
     * @private
     */
    private readonly pipelineName: string;
    /**
     * StageList
     * @private
     */
    private stageList: StageInterface[];
    /**
     * debugBuild
     * @private
     */
    private debugBuild: DebugBuildInterface = {
        status: false,
        historyList: []
    };
    /**
     * stageErrorList
     * @private
     */
    private stageErrorList: StageErrorInterface[] = [];

    /**
     * constructor
     * @param pipelineName
     * @param logsEnabled
     * @param debug
     */
    constructor(
        pipelineName: string,
        debug: boolean = false,
        logsEnabled?: boolean
    ) {
        this.pipelineName = pipelineName;
        this.stageList = [];
        this.logsEnabled = logsEnabled !== undefined
            ? logsEnabled
            : (LOGS_ENABLED === 'true');
        this.debugBuild.status = debug;

        this.saveActionToDebugHistoryList('constructor', { debug, logsEnabled });
    }

    /**
     * saveActionToDebugHistoryList
     * @param action
     * @param argList
     * @private
     */
    private saveActionToDebugHistoryList(action: string, ...argList: any[]): void {
        if (!this.debugBuild.status) return;

        const historyBundle: {
            date: any;
            action: any;
            pipeline: any;
            value?: any;
        } = { date: this.getCurrentDate(), action: this.pipelineName + ' => ' + action, pipeline: this.stageList };
        if (argList && argList.length)
            historyBundle.value = JSON.stringify(argList.length > 1? argList : argList[0]);

        if (this.debugBuild && this.debugBuild.status) this.debugBuild.historyList.push(historyBundle);
        else {
            this.debugBuild = {
                status: argList[0] ? argList[0].debug : false,
                historyList: [historyBundle]
            }
        }

        this.log('info', 'saveToDebugActionList', historyBundle);
    }

    /**
     * Get the list of all actions stored in the debug history list
     */
    public readonly getDebugActionList = () => {
        this.log('info', 'getDebugActionList', this.debugBuild.historyList);
        return this.debugBuild.historyList;
    }

    /**
     * getName
     */
    public readonly getName = () => {
        this.saveActionToDebugHistoryList('getName');
        return this.pipelineName;
    }
    /**
     * enableDebug
     */
    public readonly enableDebug = () => {
        this.debugBuild.status = true;
        this.saveActionToDebugHistoryList('enableDebug', { debugBuildStatus: this.debugBuild.status });
        return this.debugBuild.status;
    }
    /**
     * disableDebug
     */
    public readonly disableDebug = () => {
        this.debugBuild.status = false;
        this.saveActionToDebugHistoryList('disableDebug', { debugBuildStatus: this.debugBuild.status });
        return this.debugBuild.status;
    }
    /**
     * reset
     */
    public readonly resetPipeline = () => {
        this.stageList = [];
        this.saveActionToDebugHistoryList('resetPipeline');
        return this.stageList;
    }

    /**
     * addStage
     * @param stageTypeLabel
     * @param stageValue
     */
    public readonly addStage = (
        stageTypeLabel: 'addFields' | 'bucket' | 'bucketAuto' | 'collStats' | 'count' | 'facet' | 'geoNear' |
            'graphLookup' | 'group' | 'indexStats' | 'limit' | 'listSessions' | 'lookup' | 'match' | 'merge' | 'out' |
            'planCacheStats' | 'project' | 'redact' | 'replaceRoot' | 'replaceWith' | 'sample' | 'search' | 'set' |
            'skip' | 'sort' | 'sortByCount' | 'unionWith' | 'unset' | 'unwind',
        stageValue: any
    ) => {
        const stageTypeValue = getStageTypeValueFor(stageTypeLabel);
        if (!stageTypeValue && this.debugBuild.status) {
            this.saveActionToDebugHistoryList('getStageTypeValueFor', { stageTypeLabel, stageValue: JSON.stringify(stageValue) });
            throw new PipelineError('Impossible to add the stage, the stage name is not valid!');
        }

        const newStageToAdd = this.createObject(stageTypeValue ? stageTypeValue : '$' + stageTypeLabel, stageValue) as StageInterface;
        this.stageList.push(newStageToAdd);

        this.saveActionToDebugHistoryList('addStage', { stageTypeLabel, stageValue: JSON.stringify(stageValue) });
        return this;
    }

    /**
     * getPipeline
     */
    public readonly getPipeline = () => {
        this.saveActionToDebugHistoryList('getPipeline');
        return this.verifyPipelineValidity([...this.stageList]);
    }

    /**
     * verifyPipelineValidity
     * @param pipelineBuilt
     */
    private verifyPipelineValidity = (pipelineBuilt: StageInterface[]) => {
        this.log('info', 'verifyPipelineValidity of ' + this.pipelineName + ' pipeline:\n', JSON.stringify(this.stageList));
        if (!pipelineBuilt.length) throw new PipelineError('Error, ' + this.pipelineName + ' pipeline is empty!');

        this.stageErrorList = pipelineBuilt.map(
            s => this.isValidStage(s)
        ).filter(error => error) as StageErrorInterface[];

        if (this.stageErrorList.length) {
            const errorMessage = this.stageErrorList.map(
                (e, i) => (i + 1) + ') ' + e.message
            ).join('\n');
            this.log('error', errorMessage, 'stageErrorList', this.stageErrorList);

            this.saveActionToDebugHistoryList('stageErrorList', { errorMessage });
            throw new PipelineError(errorMessage);
        }
        return pipelineBuilt;
    }

    /**
     * isValidStage
     * @param stageToValidate
     * @private
     */
    private isValidStage(stageToValidate: StageInterface): null | StageErrorInterface {
        const stageType = Object.keys(stageToValidate)[0].replace('$', '');

        const treatedStageList = [
            'addFields', 'bucket', 'bucketAuto', 'collStats', 'count', 'facet', 'geoNear', 'graphLookup', 'group',
            'indexStats', 'limit', 'listSessions', 'lookup', 'match', 'merge', 'out', 'planCacheStats', 'project',
            'redact', 'replaceRoot', 'replaceWith', 'sample', 'search', 'set', 'skip', 'sort', 'sortByCount',
            'unionWith', 'unset', 'unwind'
        ];
        if (treatedStageList.includes(stageType)) return null;

        this.saveActionToDebugHistoryList(
            'Stage Error',
            { stageType, message: 'this pipeline stage type is invalid or not yet treated.' },
            { invalidStage: JSON.stringify(stageToValidate) }
        );
        return { stageType, message: 'the ' + stageType + ' stage type is invalid or not yet treated.' };
    }

    // Utils
    /**
     * newObject
     * @param key
     * @param value
     */
    private createObject = (key: string, value: any) => {
        const object: {[index: string]: any} = {};
        object[key] = value;
        return object;
    }

    /**
     * getCurrentDate
     */
    private getCurrentDate = () => moment().tz('Europe/Paris').format();

    /**
     * log
     * @param type
     * @param messageList
     * @private
     */
    private log(
        type: 'info' | 'warn' | 'error',
        ...messageList: any[]
    ) {
        if (this.logsEnabled) {
            console[type](
                this.getCurrentDate() + ':\n',
                ...messageList
            );
        }
    }
}

