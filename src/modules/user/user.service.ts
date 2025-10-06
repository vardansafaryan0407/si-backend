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
import { PremiumUser } from './premium-user';
import { IBaseSearchParams } from 'src/core/interfaces/base-search-params';
import { S3Service } from './s3service/s3.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    protected readonly repository: UserRepository,
    private sequelize: Sequelize,
    private s3Service: S3Service,
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
    return this.repository.find(userId);
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

  async updateAvatar(userId: number, key: string): Promise<string> {
    await this.repository.updateAvatarUrl(userId, key);

    return this.s3Service.getSignedUrlForGet(key);
  }

  public async searchUsers(
    searchQuery: IUsersQueryInterface,
    pagination: Pagination,
  ) {
    const { query = '', locations = [], skills = [] } = searchQuery;

    const where: any = {};

    if (query) {
      where['$or'] = [
        { firstName: { [Op.like]: `%${query}%` } },
        { lastName: { [Op.like]: `%${query}%` } },
        { email: { [Op.like]: `%${query}%` } },
      ];
    }

    if (locations.length) {
      where['country_id'] = { [Op.in]: locations };
    }

    const includes: any[] = [
      {
        model: Skill,
        attributes: ['id'],
        through: { attributes: [] },
        required: false,
      },
    ];

    if (skills.length) {
      includes[0].where = { id: { [Op.in]: skills } };
      includes[0].required = true;
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
