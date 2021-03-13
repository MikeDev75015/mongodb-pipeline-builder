import moment from 'moment-timezone';

import {StageInterface} from "./interfaces/stage.interface";
import {PipelineError} from "./errors/pipeline.error";

/**
 * PipelineBuilder
 */
export class PipelineBuilder {
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
    private debugBuild: {
        status: boolean;
        historyList: {
            date: string;
            action: string;
            value?: any;
            stageAdded?: StageInterface;
            pipeline?: StageInterface[];
        }[]
    };

    /**
     * constructor
     * @param pipelineName
     * @param debug
     */
    constructor(
        pipelineName: string,
        debug = false
    ) {
        this.pipelineName = pipelineName;
        this.stageList = [];

        this.saveActionToDebugHistoryList('constructor', null, { pipelineName, debug });
    }

    /**
     * saveActionToDebugHistoryList
     * @param action
     * @param stageAdded
     * @param argList
     * @private
     */
    private saveActionToDebugHistoryList(action: string, stageAdded = null, ...argList: any[]): void {
        const historyBundle = { date: this.getDate(), action, pipeline: this.stageList };
        if (this.stageList.length) historyBundle['pipeline'] = this.stageList;
        if (stageAdded) historyBundle['stageAdded'] = stageAdded;
        if (argList.length) historyBundle['value'] = argList.length > 1? argList : argList[0];

        if (this.debugBuild) this.debugBuild.historyList.push(historyBundle);
        else {
            this.debugBuild = {
                status: argList[0].debug,
                historyList: [historyBundle]
            }
        }

        this.log('saveToDebugActionList', historyBundle);
    }

    /**
     * Get the list of all actions stored in the debug history list
     */
    public readonly getDebugActionList = () => {
        this.log('getDebugActionList', this.debugBuild.historyList);
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
     * @param pipelineName
     * @param pipelineBuilt
     */
    private verifyPipelineValidity = (pipelineBuilt: StageInterface[]) => {
        this.log('verifyPipelineValidity of - ' + this.pipelineName + ':\n', JSON.stringify(this.stageList));
        if (!pipelineBuilt.length) throw new PipelineError('Error, ' + this.pipelineName + ' pipeline is empty!');
        pipelineBuilt.forEach(s => this.isValidStage(s));
        // TODO stage order
        return pipelineBuilt;
    }

    private isValidStage(stageToValidate: StageInterface) {
        const stageType = Object.keys(stageToValidate)[0].replace('$', '');

        switch (stageType) {
            default: {
                this.saveActionToDebugHistoryList('isValidStage Error', null, { stageType, message: 'the type of stage is not yet treated.' }, { stageToValidate }, );
                throw new PipelineError('the type of stage is not yet treated.');
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

    private getDate = () => moment().tz('Europe/Paris').format();

    private log(...messageList: any[]) {
        if (this.debugBuild.status) {
            console.info(
                this.getDate() + ':\n',
                ...messageList
            );
        }
    }
}

