import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Countries } from 'src/core/models/countries';
import { CountriesController } from './countries.controller';
import { CountriesRepository } from './countries.repository';

@Module({
  imports : [SequelizeModule.forFeature([Countries])],
  providers: [CountriesService,CountriesRepository],
  exports : [CountriesService,CountriesRepository],
  controllers : [CountriesController]
})
export class CountriesModule {}