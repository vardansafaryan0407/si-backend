import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Countries } from 'src/core/models/countries';

@Controller('countries')
export class CountriesController {


 constructor( private countriesService : CountriesService) {}
 

 @Get()
 async getAll() : Promise<Countries[]>{
    return this.countriesService.getAll();
 }

 }   

