import { ProjectStage, ProjectValue } from '../../models/stages/project-stage';

/**
 * Project Helper
 * @param field Field to project.
 * @param value Value to project.
 * @constructor
 */
export const ProjectHelper = (
  field: string,
  value: ProjectValue,
) => ({ [field]: value }) as ProjectStage;
