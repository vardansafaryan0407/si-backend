import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/core/models/role';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';

@Module({
  imports : [SequelizeModule.forFeature([Role])],
  providers: [RolesService,RolesRepository],
  exports :[RolesService,RolesRepository],
  controllers : [RolesController]
})
export class RolesModule {}
