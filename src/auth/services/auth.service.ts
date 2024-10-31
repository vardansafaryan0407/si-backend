import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthRepository} from "../repositories/auth.repository";
import {BaseService} from "../../core/services/base.service";
import {UserSignInDto} from "../dto/user-sign-in.dto";
import {JwtService} from "@nestjs/jwt";
import { UsersService } from 'src/core-database/users/users.service';
import {PasswordUtils} from "../../utils/password.utils";
import { User } from 'src/core/models/user';
import {UserSignUpDto} from "../dto/user-signup.dto";

@Injectable()
export class AuthService extends BaseService<User> {

    constructor(repository: AuthRepository, private jwtService: JwtService, private userService: UsersService) {
        super(repository)
    }

    public async signIn(userData: UserSignInDto) {

        const {email, password} = userData
        const user = await this.validateUser(email, password);

        if (user) {
            const payload = {email: user.email};
            const accessToken = this.jwtService.sign(payload);
            return {
                accessToken,
            }
        } else {
            throw new UnauthorizedException("Invalid username or email")
        }
    }

    public async signUp(userData: UserSignUpDto) {
        const password = await PasswordUtils.hashPassword(userData.password);
        const userDataWithHashedPassword = {
            ...userData,
            password
        }
        return this.userService.create(userDataWithHashedPassword);
    }

    private async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findOne({email});
        if (!user) {
            return null;
        }
        const isMatch = await PasswordUtils.comparePassword(password, user.password);
        if (!isMatch) {
            return null;
        }
        return user;
    }
}
