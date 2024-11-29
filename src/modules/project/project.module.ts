import {Module} from '@nestjs/common';
import {ProjectRepository} from "./repositories/project.repository";
import {ProjectService} from "./services/project.service";
import {ProjectController} from "./project.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Project} from "./project";
import {ProjectMember} from "./models/project-member";
import {Equity} from "./models/equity";
import { Country } from 'src/core/models/country';
import { Industry } from 'src/core/models/industry';

@Module({
    imports: [
        SequelizeModule.forFeature([Project, ProjectMember, Equity,Country,Industry])
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
