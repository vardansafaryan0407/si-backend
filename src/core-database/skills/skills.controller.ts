import { Controller, Get } from '@nestjs/common';
import { Skill } from 'src/core/models/skill';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {

constructor (private skillsService : SkillsService){}

@Get()
async getAll() : Promise<Skill[]>{
return this.skillsService.findAll();
    
}

}
