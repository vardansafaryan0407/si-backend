import {Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from './services/auth.service';
import {AuthRepository} from './repositories/auth.repository';
import {JwtSharedModule} from "../core/modules/jwt.module";
import { UserModule } from 'src/user/user.module';
import {SequelizeModule} from "@nestjs/sequelize";
import { User } from 'src/user/user';
@Module({
    imports: [JwtSharedModule, UserModule, SequelizeModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository]
})
export class AuthModule {
}
