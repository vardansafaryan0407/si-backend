import {Body, Controller, Post} from '@nestjs/common';
import {UserSignUpDto} from "./dto/user-signup.dto";
import {UserSignInDto} from "./dto/user-sign-in.dto";
import {UserResetPasswordDto} from "./dto/user-reset-password.dto";
import {AuthService} from "./services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    async signUp(@Body() userSignUpDTO: UserSignUpDto) {
        try {
            const user = this.authService.create(userSignUpDTO);
            return user
        } catch (error) {
            return error
        }
    }

    @Post('signin')
    async signIn(@Body() userSignInDto: UserSignInDto) {
        try {
            const user = this.authService.create(userSignInDto);
            return user
        } catch (error) {
            return error
        }
    }

    @Post('request-password')
    async requestPassword(@Body() userResetPassword: UserResetPasswordDto) {

    }

}
