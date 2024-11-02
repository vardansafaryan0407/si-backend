import {Controller, Get} from '@nestjs/common';
import {CountriesService} from './countries.service';
import {Country} from 'src/core/models/country';

@Controller('')
export class CountriesController {


    constructor(private countriesService: CountriesService) {}


    @Get()
    async getAll(): Promise<Country[]> {
        return this.countriesService.findAll()
    }

}

