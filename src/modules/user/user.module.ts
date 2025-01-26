import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user';
import { UserController } from './user.controller';
import { UserSkill } from 'src/core/models/user-skill';

@Module({
  imports: [SequelizeModule.forFeature([User, UserSkill])],
  providers: [UserRepository, UserService],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
