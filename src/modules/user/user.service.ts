import { BaseService } from '../../core/services/base.service';
import { UserRepository } from './user.repository';
import { User } from './user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserUpdateDto } from './dto/user-update.dto';
import { Sequelize } from 'sequelize-typescript';
import { UserCreateDto } from './dto/user-create.dto';
import { Skill } from 'src/core/models/skill';
import { IUsersQueryInterface } from 'si-shared-library';
import { Pagination } from 'src/core/models/pagination';
import { Op } from 'sequelize';
import { IBaseSearchParams } from 'src/core/interfaces/base-search-params';
import { ProjectQueryBuilder } from '../project/services/project-query-builder';
import { PremiumUser } from './premium-user';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    protected readonly repository: UserRepository,
    private sequelize: Sequelize,
  ) {
    super(repository);
  }

  async getPremiumUserById(userId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: userId },
      include: [
        {
          model: PremiumUser,
          as: 'premium',
          where: { status: 'active' },
          required: true,
        },
      ],
    });

    if (!user) {
      throw new NotFoundException(
        `Active premium user with ID ${userId} not found`,
      );
    }

    return user;
  }

  public async find(userId: number): Promise<User> {
    return this.repository.findOne({
      where: { id: userId },
      include: [
        {
          model: Skill,
          through: { attributes: [] },
        },
        {
          model: PremiumUser,
          as: 'premium',
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

  async updateAvatarUrl(userId: number, url: string) {
    return this.repository.updateAvatarUrl(userId, url);
  }

  public async searchUsers(
    searchQuery: IUsersQueryInterface,
    pagination: Pagination,
  ) {
    const { query = '', locations = [], skills = [] } = searchQuery;

    const where: any = {};

    if (query) {
      where['$or'] = [{ name: { [Op.like]: `%${query}%` } }];
    }

    if (locations.length) {
      where['country_id'] = { [Op.in]: locations };
    }

    const includes = [];

    const skillsQuery = ProjectQueryBuilder.buildSkillsQuery(skills);

    if (skills.length) {
      includes.push({
        model: Skill,
        through: { attributes: [] },
        ...skillsQuery,
        required: true,
      });
    }

    const findOptions: IBaseSearchParams = {
      where,
      include: includes,
      pagination,
      subQuery: false,
    };

    return this.repository.list(findOptions);
  }
}
