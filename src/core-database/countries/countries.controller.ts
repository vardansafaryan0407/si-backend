import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from 'src/core/models/countries';

@Controller('countries')
export class CountriesController {


 constructor( private countriesService : CountriesService) {}
 

 @Get()
 async getAll() : Promise<Country[]>{
    return this.countriesService.getAll();
 }

 }   

