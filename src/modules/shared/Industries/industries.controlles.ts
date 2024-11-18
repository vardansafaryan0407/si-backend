import { Controller, Get } from '@nestjs/common';
import { Industry } from 'src/core/models/industry';
import { IndustryService } from './industries.service';

@Controller('')
export class IndustryController {

    constructor(private industryService: IndustryService) {
    }

    @Get()
    async getAll(): Promise<Industry[]> {
        return this.industryService.findAll();

    }

}
