import {Controller, Get} from '@nestjs/common';
import {RolesService} from './roles.service';
import {Role} from 'src/core/models/role';

@Controller('')
export class RolesController {

    constructor(private rolesService: RolesService) {
    }

    @Get()
    async getAll(): Promise<Role[]> {
        return this.rolesService.findAll();
    }
}
