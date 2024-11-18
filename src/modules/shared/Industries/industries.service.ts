import {Injectable} from '@nestjs/common';
import { Industry } from 'src/core/models/industry';
import {BaseService} from 'src/core/services/base.service';
import { IndustryRepository } from './industries.repository';

@Injectable()
export class IndustryService extends BaseService<Industry> {
    constructor(repository: IndustryRepository) {
        super(repository)
    }
}
