import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserResetPasswordDto } from './dto/user-reset-password.dto';
import { AuthService } from './services/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() userSignUpDTO: UserSignUpDto) {
    try {
      return this.authService.signUp(userSignUpDTO);
    } catch (error) {
      return error;
    }
  }

  @Post('signin')
  async signIn(@Body() userSignInDto: UserSignInDto) {
    try {
      return this.authService.signIn(userSignInDto);
    } catch (error) {
      return error;
    }
  }

  @Post('request-password')
  async requestPassword(@Body() userResetPassword: UserResetPasswordDto) { }

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

  @Get('linkedin')
  async linkedInLoginCallback(@Query('code') code: string, @Res() res: Response) {
    if (!code) throw new BadRequestException('No code provided');
    try {
      const userJwt = await this.authService.loginWithLinkedIn(code);
      return userJwt;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}


