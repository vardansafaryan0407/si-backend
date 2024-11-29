import {Injectable} from "@nestjs/common";
import {BaseService} from "../../../core/services/base.service";
import {Project} from "../project";
import {ProjectRepository} from "../repositories/project.repository";
import {SearchDto} from "../dto/search-project.dto";
import {FindOptions, Op} from "sequelize";
import {Role} from "../../../core/models/role";
import {ProjectMember} from "../models/project-member";
import {Pagination} from "../../../core/models/pagination";

@Injectable()
export class ProjectService extends BaseService<Project> {

    constructor(protected readonly repository: ProjectRepository) {
        super(repository);
    }

    public async createProject(data :any) {
        await this.repository.createProject(data)
    }

    public listAllProjects() {
        this.repository.findAll()
    }

    public async searchProjects(searchQuery: SearchDto, pagination: Pagination) {
        const {query, industryId, locationId, equity, roleId} = searchQuery;


        if (industryId) {

        }
        const where = {};

        if (query) {
            where['$or'] = [
                {name: {[Op.iLike]: `%${query}%`}}
            ]
        }

        const includes = []


        // join project members

        const joinMembers: any = {
            model: ProjectMember,
            include: {
                model: Role
            },

        }
        if (roleId) {
            joinMembers.where = {role: roleId}
        }
        includes.push(joinMembers)


        const findOptions: FindOptions = {
            where,
            include: includes
        }

        return this.repository.list(findOptions, pagination)
    }
}


