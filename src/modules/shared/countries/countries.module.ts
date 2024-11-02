import {Module} from '@nestjs/common';
import {CountriesService} from './countries.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {CountriesController} from './countries.controller';
import {CountriesRepository} from './countries.repository';
import {Country} from "../../../core/models/country";

@Module({
    imports: [SequelizeModule.forFeature([Country])],
    providers: [CountriesService, CountriesRepository],
    exports: [CountriesService, CountriesRepository],
    controllers: [CountriesController]
})
export class CountriesModule {
}
