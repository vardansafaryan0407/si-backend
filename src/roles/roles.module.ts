import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from 'src/core/models/roles';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';

@Module({
  imports : [SequelizeModule.forFeature([Roles])],
  providers: [RolesService,RolesRepository],
  exports :[RolesService,RolesRepository],
  controllers : [RolesController]
})
export class RolesModule {}
