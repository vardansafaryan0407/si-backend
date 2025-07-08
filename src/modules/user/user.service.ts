import { BaseService } from '../../core/services/base.service';
import { UserRepository } from './user.repository';
import { User } from './user';
import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from './dto/user-update.dto';
import { Sequelize } from 'sequelize-typescript';
import { UserCreateDto } from './dto/user-create.dto';
import { Skill } from 'src/core/models/skill';
import { IUsersQueryInterface } from 'si-shared-library';
import { Pagination } from 'src/core/models/pagination';
import { Op } from 'sequelize';
import { IBaseSearchParams } from 'src/core/interfaces/base-search-params';

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

  public async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  public async getById(id: number): Promise<User> {
    return this.repository.getById(id);
  }


  public async searchUsers(
    searchQuery: IUsersQueryInterface,
    pagination: Pagination
  ) {
    const {
      query = '',
      firstName = '',
      lastName = '',
      email = ''
    } = searchQuery;

    const where: any = {};

    if (query) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${query}%` } },
        { lastName: { [Op.like]: `%${query}%` } },
        { email: { [Op.like]: `%${query}%` } },
      ];
    }

    if (firstName) {
      where.firstName = { [Op.like]: `%${firstName}%` };
    }

    if (lastName) {
      where.lastName = { [Op.like]: `%${lastName}%` };
    }

    if (email) {
      where.email = { [Op.like]: `%${email}%` };
    }

    const findOptions: IBaseSearchParams = {
      where,
      include: [],  
      pagination,
      subQuery: false,
    };

    return this.repository.list(findOptions);
  }
}