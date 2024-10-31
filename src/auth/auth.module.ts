import {Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from './services/auth.service';
import {AuthRepository} from './repositories/auth.repository';
import {JwtSharedModule} from "../core/modules/jwt.module";
import { UsersModule } from 'src/core-database/users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import { User } from 'src/core/models/user';
@Module({
    imports: [JwtSharedModule, UsersModule, SequelizeModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository]
})
export class AuthModule {
}
