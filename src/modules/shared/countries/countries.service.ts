import {Injectable} from '@nestjs/common';
import {Country} from 'src/core/models/country';
import {BaseService} from 'src/core/services/base.service';
import {CountriesRepository} from './countries.repository';

@Injectable()
export class CountriesService extends BaseService<Country> {

    constructor(repository: CountriesRepository) {
        super(repository)
    }


}
