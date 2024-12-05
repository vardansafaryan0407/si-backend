import {BaseRepository} from "../../../core/repositories/base.repository";
import {Project} from "../project";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ProjectMember} from "../models/project-member";
import {Equity} from "../models/equity";

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
    constructor(@InjectModel(Project) model: typeof Project) {
        super(model);
    }

    public async createProject(createProjectData) {
        await this.model.create(createProjectData, {
            include: {
                model: ProjectMember,
                include: [Equity]
            }
        });
    }

    public async getProjectList() {
        return this.model.findAll()
    }
}
