import {Injectable, NotFoundException} from '@nestjs/common';
import {BaseService} from '../../../core/services/base.service';
import {Project} from '../project';
import {ProjectRepository} from '../repositories/project.repository';
import {Op} from 'sequelize';
import {Role} from '../../../core/models/role';
import {ProjectMember} from '../models/project-member';
import {Pagination} from '../../../core/models/pagination';
import {CreateProjectDto} from '../dto/create-project.dto';
import {Equity} from '../models/equity';
import {Skill} from '../../../core/models/skill';
import {Sequelize} from 'sequelize-typescript';
import {IBaseSearchParams} from '../../../core/interfaces/base-search-params';
import {IPaginationParams} from '../../../core/interfaces/pagination';
import {UpdateProjectDto} from '../dto/project-update.dto';
import {IProjectQueryInterface} from "si-shared-library";
import {ProjectQueryBuilder} from "./project-query-builder";

@Injectable()
export class ProjectService extends BaseService<Project> {
    constructor(
        protected readonly repository: ProjectRepository,
        private sequelize: Sequelize,
    ) {
        super(repository);
    }

    public async createProject(data: CreateProjectDto, user_id: number) {
        const projectCreationData = {
            ...data,
            owner_id: user_id,
        };

        await this.sequelize.transaction(async () => {
            const project = await this.repository.createProject(projectCreationData);
            for (let i = 0; i < project.members.length; i++) {
                const projectMember = project.members[i];
                await projectMember.addSkills(data.members[i].skills);
            }
        });
    }

    public findById(id: number) {
        return this.repository.findById(id);
    }

    async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
        const project = await this.repository.findById(id);
        if (!project) {
            throw new NotFoundException('project not found');
        }

        // TODO remove any and implement correct types
        await project.update(updateProjectDto as any);
        return project;
    }

    getUserProjects(userId: number, pagination: IPaginationParams) {
        const findOptions: IBaseSearchParams = {
            where: {
                owner_id: userId,
            },
            pagination,
        };
        return this.repository.list(findOptions);
    }

    public async searchProjects(
        searchQuery: IProjectQueryInterface,
        pagination: Pagination,
    ) {
        const {query = '', industries = [], locations = [], equity = {}, roles = [], skills = []} = searchQuery;

        const where = {};

        if (query) {
            where['$or'] = [{name: {[Op.iLike]: `%${query}%`}}];
        }
        if (locations.length) {
            where['country'] = {[Op.in]: locations};
        }
        if (roles && roles.length) {
            where['role_id'] = {[Op.in]: roles};
        }

        if (industries) {
        }

        const includes = [];

        const skillsQuery = ProjectQueryBuilder.buildSkillsQuery(skills);

        const joinMembers: any = {
            model: ProjectMember,
            required: true,
            include: [
                {
                    model: Skill,
                    through: {
                        attributes: [],
                    },
                    ...skillsQuery,
                    required: !!skills?.length
                },
                {
                    model: Role,
                },
                {
                    model: Equity,
                    ...ProjectQueryBuilder.buildEquityQuery(equity),
                    required: !!(equity?.min || equity?.max)
                },
            ],
        };
        includes.push(joinMembers)


        console.log(where)
        const findOptions: IBaseSearchParams = {
            where,
            include: includes,
            pagination,
            subQuery: false,
        };
        return this.repository.list(findOptions);
    }
}
