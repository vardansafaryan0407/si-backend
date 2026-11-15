import { CreateProjectDto } from '../dto/create-project.dto';

export interface IProjectCreateData extends CreateProjectDto {
  owner_id: number;
}
