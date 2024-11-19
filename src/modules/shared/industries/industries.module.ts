import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Industry } from 'src/core/models/industry';
import { IndustriesRepository } from './industries.repository';
import { IndustriesController } from './industries.controller';

@Module({
  imports : [SequelizeModule.forFeature([Industry])],
  providers: [IndustriesService,IndustriesRepository],
  exports : [IndustriesService,IndustriesRepository],
  controllers : [IndustriesController]
})
export class IndustriesModule {}
