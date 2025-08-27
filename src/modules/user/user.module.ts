import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user';
import { UserController } from './user.controller';
import { UserSkill } from 'src/core/models/user-skill';
import { Skill } from 'src/core/models/skill';
import { PremiumUser } from './premium-user';

@Module({
  imports: [SequelizeModule.forFeature([User, UserSkill, Skill, PremiumUser])],
  providers: [UserRepository, UserService],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
