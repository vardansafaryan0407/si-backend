import {Module} from '@nestjs/common';
import {ProjectRepository} from "./repositories/project.repository";
import {ProjectService} from "./services/project.service";
import {ProjectController} from "./project.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Project} from "./project";
import {ProjectMember} from "./models/project-member";
import {Equity} from "./models/equity";
import { Industry } from 'src/core/models/industry';
import { Country } from 'src/core/models/country';
import { Skill } from 'src/core/models/skill';


@Module({
    imports: [
        SequelizeModule.forFeature([Project, ProjectMember, Equity,Country,Industry,Skill])
    ],
    providers: [
        ProjectRepository, ProjectService
    ],
    controllers: [
        ProjectController
    ]
})
export class ProjectModule {
}
