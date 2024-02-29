import {Global, Module} from "@nestjs/common";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JWT_CONSTANTS} from "../../config/jwt.constant";

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: JWT_CONSTANTS.secret,
            signOptions: {expiresIn: '1h'},
        }),
    ],
    providers: [
        JwtService
    ],
    exports: [
        JwtModule
    ]
})
export class JwtSharedModule {

}
