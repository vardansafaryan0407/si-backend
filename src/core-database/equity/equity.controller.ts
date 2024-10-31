import { Controller, Get } from '@nestjs/common';
import { EquityService } from './equity.service';
import { Equity } from 'src/project/models/equity';

@Controller('equity')
export class EquityController {
constructor (private equityService : EquityService){}



   @Get()
    async getAll() : Promise<Equity[]>{
        return this.equityService.findAll();
   } 

}
