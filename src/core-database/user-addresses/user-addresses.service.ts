import { Injectable } from '@nestjs/common';
import { UserAddress } from 'src/core/models/user-addresses';
import { BaseService } from 'src/core/services/base.service';
import { UserAddressesRepository } from './user-addresses.repository';

@Injectable()
export class UserAddressesService  extends BaseService<UserAddress>{
    constructor(repository : UserAddressesRepository){
        super(repository)
    }


    async getAll() : Promise<UserAddress[]>{
        return this.repository.findAll();
    }
}
