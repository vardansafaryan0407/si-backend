import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CONFIG_DB } from './config/config.db';
import { SequelizeOptions } from 'sequelize-typescript';
import { JwtSharedModule } from './core/modules/jwt.module';
import { ProjectModule } from './modules/project/project.module';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { SharedModule } from './modules/shared/shared.module';
import { EmailModule } from './core/email/email.module';
import { ProjectMemberModule } from './modules/project/project-member/project-member.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/email.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    RouterModule.register(appRoutes),
    ConfigModule.forRoot({
      load: [emailConfig],
      isGlobal: true,
    }),
    SequelizeModule.forRoot(CONFIG_DB as SequelizeOptions),
    AuthModule,
    UserModule,
    JwtSharedModule,
    ProjectModule,
    ProjectMemberModule,
    SharedModule,
    EmailModule,
      PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
