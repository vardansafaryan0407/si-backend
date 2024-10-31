import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from 'src/core/models/country';
import { CountriesController } from './countries.controller';
import { CountriesRepository } from './countries.repository';

@Module({
  imports : [SequelizeModule.forFeature([Country])],
  providers: [CountriesService,CountriesRepository],
  exports : [CountriesService,CountriesRepository],
  controllers : [CountriesController]
})
export class CountriesModule {}
