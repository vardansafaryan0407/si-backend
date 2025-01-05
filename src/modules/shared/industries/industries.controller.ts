import {Controller, Get} from '@nestjs/common';
import {IndustriesService} from './industries.service';
import {Industry} from 'src/core/models/industry';

@Controller('')
export class IndustriesController {


    constructor(private industriesService: IndustriesService) {
    }


    @Get()
    async getAll(): Promise<Industry[]> {
        return this.industriesService.findAll();
    }
}
