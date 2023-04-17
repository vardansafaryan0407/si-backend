import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthRepository} from "../auth-repository/auth.repository";
import {BaseService} from "../../core/services/base.service";
import {UserSignInDto} from "../dto/user-sign-in.dto";

@Injectable()
export class AuthService extends BaseService {

    constructor(repository: AuthRepository) {
        super(repository)
    }

    public async signIn(userData: UserSignInDto) {
        const user = this.repository.find(userData);
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException("Invalid username or email")
        }
    }

    public async signUp() {

    }
}
