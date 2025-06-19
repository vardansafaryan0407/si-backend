import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { BaseService } from '../../core/services/base.service';
import { UserSignInDto } from '../dto/user-sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordUtils } from '../../utils/password.utils';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { User } from '../../modules/user/user';
import { UserService } from '../../modules/user/user.service';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService extends BaseService<User> {
  constructor(
    repository: AuthRepository,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super(repository);
  }

  private googleClient = new OAuth2Client(
    this.configService.get<string>('GOOGLE_CLIENT_ID'),
  );


  public async signIn(userData: UserSignInDto) {
    const { email, password } = userData;
    const user = await this.validateUser(email, password);

    if (user) {
      const payload = { email: user.email, id: user.id };
      const accessToken = this.jwtService.sign(payload);
      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Invalid username or email');
    }
  }

  public async signUp(userData: UserSignUpDto) {
    const password = await PasswordUtils.hashPassword(userData.password);
    const userDataWithHashedPassword = {
      ...userData,
      password,
    };
    return this.userService.create(userDataWithHashedPassword);
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const isMatch = await PasswordUtils.comparePassword(
      password,
      user.password,
    );
    if (!isMatch) {
      return null;
    }
    return user;
  }

  public async loginWithGoogle(idToken: string) {
    const randomPassword = await bcrypt.hash(
      Math.random().toString(36).slice(-8),
      10,
    );

    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid Google token payload');
    }

    let user = await this.userService.findOne({
      where: { email: payload.email },
    });

    if (!user) {
      user = await this.userService.create({
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        password: randomPassword,
      });
    }

    const jwtPayload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(jwtPayload);

    return { accessToken };
  }

  public async loginWithLinkedIn(code: string) {
    try {
      const tokenResponse = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.configService.get<string>('LINKEDIN_REDIRECT_URI'),
          client_id: this.configService.get<string>('LINKEDIN_CLIENT_ID'),
          client_secret: this.configService.get<string>('LINKEDIN_CLIENT_SECRET'),
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      const { access_token } = tokenResponse.data;
      if (!access_token) {
        throw new Error('No access_token received from LinkedIn');
      }

      const userInfoResponse = await axios.get(
        'https://api.linkedin.com/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const userInfo = userInfoResponse.data;
      const email = userInfo.email;
      const firstName = userInfo.given_name || '';
      const lastName = userInfo.family_name || '';

      if (!email) {
        throw new Error('Email not found in LinkedIn OIDC userinfo');
      }

      let user = await this.userService.findOne({ where: { email } });

      if (!user) {
        const randomPassword = await bcrypt.hash(
          Math.random().toString(36).slice(-8),
          10,
        );
        user = await this.userService.create({
          email,
          firstName,
          lastName,
          password: randomPassword,
        });
      }

      const jwtPayload = {
        email: user.email,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const accessTokenJwt = this.jwtService.sign(jwtPayload);

      return {
        token: { accessToken: accessTokenJwt },
      };
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }
}
