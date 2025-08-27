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
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { VerifyResetDto } from './dto/verify-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthService } from './services/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  async requestPassword(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    try {
      return await this.authService.requestPasswordReset(
        requestPasswordResetDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('verify-reset')
  async verifyReset(@Query() verifyResetDto: VerifyResetDto) {
    try {
      return await this.authService.verifyResetToken(verifyResetDto.code);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return await this.authService.resetPassword(resetPasswordDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

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

  @Post('linkedin')
  async linkedInLoginCallback(@Body('code') code: string) {
    if (!code) throw new BadRequestException('No code provided');
    try {
      return await this.authService.loginWithLinkedIn(code);
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }
}
