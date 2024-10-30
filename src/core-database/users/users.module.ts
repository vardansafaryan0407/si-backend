import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/core/models/users';
import { UsersRepository } from './users.repository';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UsersService,UsersRepository],
  exports : [UsersService,UsersRepository],
  controllers : [UsersController]
})
export class UsersModule {}
