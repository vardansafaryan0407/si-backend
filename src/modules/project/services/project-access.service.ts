import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Project } from '../project';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionApplication } from '../models/project-position-application';

/**
 * Who may change what around a project. A project belongs to the user who created it
 * (`owner_id`); its positions and the applications to them follow the project. Every
 * route that edits a project, edits or removes a position, or decides on an application
 * goes through one of these checks. They throw 404 when the thing does not exist and
 * 403 when it belongs to somebody else.
 */
@Injectable()
export class ProjectAccessService {
  async assertProjectOwner(projectId: number, userId: number): Promise<void> {
    const project = await Project.findByPk(projectId, {
      attributes: ['id', 'owner_id'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    if (Number(project.owner_id) !== Number(userId)) {
      throw new ForbiddenException('Only the project owner can do this');
    }
  }

  async assertPositionOwner(positionId: number, userId: number): Promise<void> {
    const position = await ProjectPosition.findByPk(positionId, {
      attributes: ['id', 'project_id'],
    });
    if (!position || !position.project_id) {
      throw new NotFoundException('Position not found');
    }
    await this.assertProjectOwner(position.project_id, userId);
  }

  /** The owner of the project the application was sent to. */
  async assertApplicationOwner(
    applicationId: number,
    userId: number,
  ): Promise<void> {
    const application = await this.findApplication(applicationId);
    await this.assertPositionOwner(application.position_id, userId);
  }

  /** The project owner or the person who applied: the two who may read an application. */
  async assertApplicationParty(
    applicationId: number,
    userId: number,
  ): Promise<void> {
    const application = await this.findApplication(applicationId);
    if (Number(application.user_id) === Number(userId)) {
      return;
    }
    await this.assertPositionOwner(application.position_id, userId);
  }

  private async findApplication(
    applicationId: number,
  ): Promise<ProjectPositionApplication> {
    const application = await ProjectPositionApplication.findByPk(
      applicationId,
      { attributes: ['id', 'user_id', 'position_id'] },
    );
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }
}
