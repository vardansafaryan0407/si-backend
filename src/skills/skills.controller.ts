import { Controller, Get } from '@nestjs/common';
import { Skills } from 'src/core/models/skills';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {

constructor (private skillsService : SkillsService){}

@Get()
async getAll() : Promise<Skills[]>{
return this.skillsService.getAll();
    
}

}
