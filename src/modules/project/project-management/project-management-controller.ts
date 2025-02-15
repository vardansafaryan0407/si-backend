import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ProjectManagmentService } from './project-management.service';
import { UpdateProjectDto } from '../dto/project-update.dto';

@Controller('project-management')
export class ProjectManagementController {
  constructor(private projectManagementService: ProjectManagmentService) {}

  @Put('update/:id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectManagementService.updateProject(
      id,
      updateProjectDto,
    );
  }
}
