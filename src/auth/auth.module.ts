import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { JwtSharedModule } from '../core/modules/jwt.module';
import { UserModule } from 'src/modules/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/user/user';
import { EmailService } from '../core/email/email.service';

@Module({
  imports: [JwtSharedModule, UserModule, SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, EmailService],
})
export class AuthModule {}
