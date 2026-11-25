import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from '../../core/models/country';
import { Industry } from '../../core/models/industry';
import { ProjectPosition } from '../project/models/project-position';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

@Module({
  imports: [SequelizeModule.forFeature([ProjectPosition, Country, Industry])],
  providers: [PositionsService],
  controllers: [PositionsController],
})
export class PositionsModule {}
