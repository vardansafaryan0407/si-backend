import { Controller, Get } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { UserAddress } from 'src/core/models/user-addresses';

@Controller('user-addresses')
export class UserAddressesController {

constructor(private userAddressesService : UserAddressesService){}


@Get()
async getAll() : Promise<UserAddress[]>{
    return this.userAddressesService.getAll();
    

}
}