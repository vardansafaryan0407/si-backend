import { BaseService } from '../../core/services/base.service';
import { UserRepository } from './user.repository';
import { User } from './user';
import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from './user-update.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  public async updateUser(id: number, userData: UserUpdateDto) {
    return this.repository.update(id, userData);
  }
}
