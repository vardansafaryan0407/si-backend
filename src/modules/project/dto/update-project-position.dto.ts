import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectPositionDto } from './create-project-position.dto';

export class UpdateProjectPositionDto extends PartialType(CreateProjectPositionDto) {}