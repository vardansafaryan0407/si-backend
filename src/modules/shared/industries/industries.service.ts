import {Injectable} from '@nestjs/common';
import {Industry} from 'src/core/models/industry';
import {BaseService} from 'src/core/services/base.service';
import {IndustriesRepository} from './industries.repository';

@Injectable()
export class IndustriesService extends BaseService<Industry> {

    constructor(repository: IndustriesRepository) {
        super(repository)
    }

}
