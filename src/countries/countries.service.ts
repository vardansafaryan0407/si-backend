import { Injectable } from '@nestjs/common';
import { Countries } from 'src/core/models/countries';
import { BaseService } from 'src/core/services/base.service';
import { CountriesRepository } from './countries.repository';

@Injectable()
export class CountriesService  extends BaseService<Countries>{

    constructor(repository : CountriesRepository){
        super(repository)
    }



    async getAll() : Promise<Countries[]>{
        return this.repository.findAll();
    }


}
