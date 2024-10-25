import { Module } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAddresses } from 'src/core/models/user.addresses';
import { UserAddressesController } from './user-addresses.controller';
import { UserAddressesRepository } from './user-addresses.repository';

@Module({
  imports : [SequelizeModule.forFeature([UserAddresses])],
  providers: [UserAddressesService,UserAddressesRepository],
  exports : [UserAddressesService,UserAddressesRepository],
  controllers : [UserAddressesController]
})
export class UserAddressesModule {}
