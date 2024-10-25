import { Controller, Get } from '@nestjs/common';
import { UsersSkillsService } from './users-skills.service';
import { UserSkills } from 'src/core/models/user.skills';

@Controller('users-skills')
export class UsersSkillsController {

constructor(private usersSkillsService : UsersSkillsService){}

@Get()
async getAll():Promise<UserSkills[]>{
    return this.usersSkillsService.getAll();
}

}
