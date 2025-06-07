import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserResetPasswordDto } from './dto/user-reset-password.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userSignUpDTO: UserSignUpDto) {
    try {
      const user = await this.authService.signUp(userSignUpDTO);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Post('signin')
  async signIn(@Body() userSignInDto: UserSignInDto) {
    try {
      return await this.authService.signIn(userSignInDto);
    } catch (error) {
      return error;
    }
  }

  @Post('request-password')
  async requestPassword(@Body() userResetPassword: UserResetPasswordDto) {}

  @Post('google')
  async googleLogin(@Body('id_token') idToken: string) {
    if (!idToken) {
      throw new BadRequestException('No token provided');
    }

    try {
      const userJwt = await this.authService.loginWithGoogle(idToken);
      return userJwt;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
