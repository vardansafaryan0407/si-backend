import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from 'src/core/models/roles';

@Controller('roles')
export class RolesController {

    constructor(private rolesService : RolesService){}

    @Get()
    async getAll(): Promise<Roles[]> {
        return this.rolesService.getAll();
    }
}
