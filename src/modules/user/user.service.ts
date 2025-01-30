import { BaseService } from '../../core/services/base.service';
import { UserRepository } from './user.repository';
import { User } from './user';
import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from './dto/user-update.dto';
import { Sequelize } from 'sequelize-typescript';
import { UserCreateDto } from './dto/user-create.dto';
import { Skill } from 'src/core/models/skill';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    protected readonly repository: UserRepository,
    private sequelize: Sequelize,
  ) {
    super(repository);
  }

  public async find(userId: number): Promise<User> {
    return this.repository.findOne({
      where: { id: userId },
      include: [
        {
          model: Skill,
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  public async updateUser(id: number, userData: UserUpdateDto) {
    return this.repository.update(id, userData);
  }

  public async updateUserWithSkills(id: number, userData: UserCreateDto) {
    return await this.sequelize.transaction(async () => {
      const user = await this.repository.update(id, userData);
      if (userData.skills && userData.skills.length > 0) {
        await user.setSkills(userData.skills);
      }

      return user;
    });
  }
}
