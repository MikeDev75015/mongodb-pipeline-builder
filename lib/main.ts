import moment from 'moment-timezone';
import {
    DebugBuildInterface,
    StageErrorInterface,
    StageInterface
} from "./interfaces";
import { PipelineError } from "./errors";
import { LOGS_ENABLED } from './';
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
    private debugBuild: DebugBuildInterface;
    /**
     * stageErrorList
     * @private
     */
    private stageErrorList: StageErrorInterface[];

    /**
     * constructor
     * @param pipelineName
     * @param logsEnabled
     * @param debug
     */
    constructor(
        pipelineName: string,
        logsEnabled: boolean = undefined,
        debug = false
    ) {
        this.pipelineName = pipelineName;
        this.stageList = [];
        this.logsEnabled = logsEnabled !== undefined
            ? logsEnabled
            : (LOGS_ENABLED === 'true');

        this.saveActionToDebugHistoryList('constructor', null, { pipelineName, debug });
    }

    /**
     * saveActionToDebugHistoryList
     * @param action
     * @param stageAdded
     * @param argList
     * @private
     */
    private saveActionToDebugHistoryList(action: string, stageAdded = undefined, ...argList: any[]): void {
        if (this.debugBuild && !this.debugBuild.status) return;

        const historyBundle = { date: this.getCurrentDate(), action, pipeline: this.stageList };
        if (this.stageList.length) historyBundle['pipeline'] = this.stageList;
        if (stageAdded) historyBundle['stageAdded'] = stageAdded;
        if (argList.length) historyBundle['value'] = argList.length > 1? argList : argList[0];

        if (this.debugBuild && this.debugBuild.status) this.debugBuild.historyList.push(historyBundle);
        else {
            this.debugBuild = {
                status: argList[0].debug,
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
        this.saveActionToDebugHistoryList('getName', null, { pipelineName: this.pipelineName });
        return this.pipelineName;
    }
    /**
     * enableDebug
     */
    public readonly enableDebug = () => {
        this.debugBuild.status = true;
        this.saveActionToDebugHistoryList('enableDebug', null, { debugBuildStatus: this.debugBuild.status });
        return this.debugBuild.status;
    }
    /**
     * disableDebug
     */
    public readonly disableDebug = () => {
        this.debugBuild.status = false;
        this.saveActionToDebugHistoryList('disableDebug', null, { debugBuildStatus: this.debugBuild.status });
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
     * @param stageType
     * @param stageValue
     */
    public readonly addStage = (
        stageType: 'addFields' | 'match' | 'lookup' | 'project' | 'unset' | 'sort' | 'count' | 'skip' | 'limit',
        stageValue: any
    ) => {
        const newStageToAdd = this.createObject('$' + stageType, stageValue) as StageInterface;
        this.stageList.push(newStageToAdd);

        this.saveActionToDebugHistoryList('addStage', newStageToAdd, { stageType, stageValue });
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
        ).filter(error => error);

        // TODO verify stage order
        if (this.stageErrorList.length) {
            const errorMessage = this.stageErrorList.map(
                (e, i) => (i + 1) + ') ' + e.message
            ).join('\n');
            this.log('error', errorMessage, 'stageErrorList', this.stageErrorList);

            this.saveActionToDebugHistoryList('stageErrorList', null, { errorMessage });
            throw new PipelineError(errorMessage);
        }
        return pipelineBuilt;
    }

    private isValidStage(stageToValidate: StageInterface): null | StageErrorInterface {
        const stageType = Object.keys(stageToValidate)[0].replace('$', '');

        const treatedStageList = ['addFields', 'match', 'lookup', 'project', 'unset', 'sort', 'count', 'skip', 'limit'];
        switch (treatedStageList.includes(stageType)) {
            case true: return null;
            default: {
                this.saveActionToDebugHistoryList(
                    'Stage Error',
                    null,
                    { stageType, message: 'this pipeline stage type is invalid or not yet treated.' },
                    { invalidStage: stageToValidate }
                );
                return { stageType, message: 'the ' + stageType + ' stage type is invalid or not yet treated.' };
            }
        }
    }

    // Utils
    /**
     * newObject
     * @param key
     * @param value
     */
    private createObject = (key: string, value: any) => {
        const object = {};
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

