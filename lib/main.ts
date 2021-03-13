import {StageInterface} from "./interfaces/stage.interface";

export class PipelineBuilder {
    private readonly pipelineName: string;
    private pipelineBuilt: StageInterface[];
    private debugBuild: {
        status: boolean;
        historyList: {
            action: string;
            value: any;
            pipeline: StageInterface[];
        }[]
    };

    constructor(pipelineName: string, debug = false) {
        this.pipelineName = pipelineName;
        this.debugBuild.status = debug;
        this.pipelineBuilt = [];
    }

    public readonly getName = () => this.pipelineName;
    public readonly showDebug = () => this.debugBuild.status = true;
    public readonly hideDebug = () => this.debugBuild.status = false;
    public readonly reset = () => this.pipelineBuilt = [];

    public readonly addStage = (
        stageType: 'addFields' | 'match' | 'lookup' | 'project' | 'unset' | 'sort' | 'count' | 'skip' | 'limit',
        stageValue: any
    ) => {
        this.pipelineBuilt.push(this.newObject('$' + stageType, stageValue) as StageInterface);
        return this;
    }

    private

    public readonly getPipeline = () => {
        if (!this.pipelineBuilt) throw new Error('Error, ' + this.pipelineName + ' pipeline does not exist!');
        console.log('PipelineBuilder - ' + this.pipelineName + ':\n', JSON.stringify(this.pipelineBuilt));

        return this.verifyPipelineValidity([...this.pipelineBuilt]);
    }

    /**
     * verifyPipelineValidity
     * @param pipelineName
     * @param pipelineBuilt
     */
    private verifyPipelineValidity = (pipelineBuilt: StageInterface[]) => {
        if (!pipelineBuilt.length) throw new Error('Error, ' + this.pipelineName + ' pipeline is empty!');
        // TODO stage validity
        // TODO stage order
        return pipelineBuilt;
    }

    // Utils
    /**
     * newObject
     * @param key
     * @param value
     */
    private readonly newObject = (key: string, value: any) => {
        const newObject = {};
        newObject[key] = value;
        return newObject;
    }
}

