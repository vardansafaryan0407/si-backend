import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from '../../core/repositories/base.repository';
import { User } from './user';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from 'src/core/models/skill';
import { PremiumUser } from './premium-user';
import { url } from 'inspector';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) model: typeof User) {
    super(model);
  }

  public async createUser(createUserData) {
    return await this.model.create(createUserData, {
      include: { model: Skill },
    });
  }

  public async find(userId: number): Promise<User> {
    return this.model.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password', 'resetPasswordExpires', 'resetPasswordToken'],
      },
      include: [
        {
          model: Skill,
          attributes: ['id'],
          through: { attributes: [] },
        },
        {
          model: PremiumUser,
          as: 'premium',
        },
      ],
    });
  }

  public async getById(id: number): Promise<User | null> {
    return this.model.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'resetPasswordExpires', 'resetPasswordToken'],
      },
      include: [
        {
          model: Skill,
          attributes: ['id'],

          through: { attributes: [] },
        },
        {
          model: PremiumUser,
          as: 'premium',
        },
      ],
    });
  }

async updateAvatarUrl(userId: number, key: string): Promise<User> {
  const user = await this.model.findByPk(userId);
  if (!user) throw new NotFoundException('user not found');

  user.url = key;
  await user.save();
  return user;
}

  public async findAll(options?: any): Promise<User[]> {
    return this.model.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Skill,
          attributes: ['id'],

          through: { attributes: [] },
        },
      ],
      ...options,
    });
  }
}
