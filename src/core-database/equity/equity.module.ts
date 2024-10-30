import { Module } from '@nestjs/common';
import { EquityService } from './equity.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equity } from 'src/project/models/equity';
import { EquityController } from './equity.controller';
import { EquityRepository } from './equity.repository';

@Module({
  imports :[SequelizeModule.forFeature([Equity])],
  providers: [EquityService,EquityRepository],
  exports : [EquityService,EquityRepository],
  controllers : [EquityController]
})
export class EquityModule {}
