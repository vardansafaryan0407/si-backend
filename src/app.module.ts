import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {CONFIG_DB} from "./config/config.db";
import {SequelizeOptions} from "sequelize-typescript";
import {JwtSharedModule} from "./core/modules/jwt.module";
import { ProjectModule } from './project/project.module';
import {CoreModule} from "./core/core.module";

@Module({
    imports: [
        SequelizeModule.forRoot(CONFIG_DB as SequelizeOptions),
        AuthModule,
        UserModule,
        JwtSharedModule,
        ProjectModule,
        CoreModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
