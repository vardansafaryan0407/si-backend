import { Controller, Get } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { UserAddresses } from 'src/core/models/user.addresses';

@Controller('user-addresses')
export class UserAddressesController {

constructor(private userAddressesService : UserAddressesService){}


@Get()
async getAll() : Promise<UserAddresses[]>{
    return this.userAddressesService.getAll();
    

}
}