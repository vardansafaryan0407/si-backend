import { Injectable } from '@nestjs/common';
import { UserAddresses } from 'src/core/models/user.addresses';
import { BaseService } from 'src/core/services/base.service';
import { UserAddressesRepository } from './user-addresses.repository';

@Injectable()
export class UserAddressesService  extends BaseService<UserAddresses>{
    constructor(repository : UserAddressesRepository){
        super(repository)
    }
}
