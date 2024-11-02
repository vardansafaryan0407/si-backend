import {Module} from '@nestjs/common';
import {RolesService} from './roles.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {RolesController} from './roles.controller';
import {RolesRepository} from './roles.repository';
import {Role} from "../../../core/models/role";

@Module({
    imports: [SequelizeModule.forFeature([Role])],
    providers: [RolesService, RolesRepository],
    exports: [RolesService, RolesRepository],
    controllers: [RolesController]
})
export class RolesModule {
}
