import { PipelineError } from '../errors';
import { PipelineStage, ValidPipelineStageNameList } from '../models';
import { checkArgsValidity, throwError } from './method-utils';

describe('Method Utils', () => {
  describe('checkArgsValidity', () => {
    test.each([
      ['the target is not valid', undefined, [], 'Application not possible, the target is not valid.'],
      [
        'the target does not have the aggregate method',
        {},
        [],
        'Application not possible, the aggregate method does not exist on the chosen target.',
      ],
      [
        'the pipeline is not valid',
        { aggregate: () => [] },
        undefined as unknown as PipelineStage[],
        'Application not possible, the pipeline is not valid.',
      ],
      ['the pipeline is empty', { aggregate: () => [] }, [], 'Application not possible, the pipeline is empty.'],
      [
        'one pipeline stage is unknown or not valid',
        { aggregate: () => [] },
        [{ $unknownStage: 'value' } as PipelineStage],
        'Application not possible, $unknownStage pipeline stage is unknown or not valid.',
      ],
      [
        'multiple pipeline stages are unknown or not valid',
        { aggregate: () => [] },
        [{ $unknownStage1: 'value' } as PipelineStage, { $unknownStage2: 'value' } as PipelineStage],
        'Application not possible, $unknownStage1 / $unknownStage2 pipeline stages are unknown or not valid.',
      ],
    ])(
      'should throw a PipelineError if %s',
      (_, target: any, pipeline: PipelineStage[], expectedMessage: string) => {
        expect(() => checkArgsValidity(target, pipeline))
          .toThrow(new PipelineError(expectedMessage));
      },
    );

    it('should not throw an error if target, pipeline and stages are valid', () => {
      const validTarget = { aggregate: () => [] };
      const validPipeline: PipelineStage[] = [{ $match: {} }];

      expect(() => checkArgsValidity(validTarget, validPipeline))
        .not.toThrow();
    });

    it('should not throw an error if pipeline contains multiple valid stages', () => {
      const validTarget = { aggregate: () => [] };
      const validPipeline: PipelineStage[] = [
        { $match: { name: 'test' } },
        { $group: { _id: null } },
        { $sort: { _id: 1 } },
      ];

      expect(() => checkArgsValidity(validTarget, validPipeline))
        .not.toThrow();
    });
  });

  describe('throwError', () => {
    it('should throw a PipelineError with the provided message', () => {
      const errorMessage = 'Custom error message';

      expect(() => throwError(errorMessage))
        .toThrow(new PipelineError(errorMessage));
    });

    it('should throw a PipelineError with an empty message', () => {
      expect(() => throwError(''))
        .toThrow(new PipelineError(''));
    });

    it('should throw a PipelineError with a message containing special characters', () => {
      const specialMessage = 'Error: $special @#$ message!';

      expect(() => throwError(specialMessage))
        .toThrow(new PipelineError(specialMessage));
    });
  });
});

