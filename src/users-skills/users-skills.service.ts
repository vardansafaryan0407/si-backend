import { Injectable } from '@nestjs/common';
import { UserSkills } from 'src/core/models/user.skills';
import { BaseService } from 'src/core/services/base.service';
import { UserSkillsRepository } from './users-skills.repository';

@Injectable()
export class UsersSkillsService extends BaseService<UserSkills> {
    constructor(repository : UserSkillsRepository){
        super(repository)
    }
}
