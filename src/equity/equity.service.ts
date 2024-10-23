import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { Equity } from 'src/project/models/equity';
import { EquityRepository } from './equity.repository';

@Injectable()
export class EquityService  extends BaseService<Equity>{
    constructor(repository : EquityRepository){
        super(repository)
    }
}
