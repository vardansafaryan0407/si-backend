import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../core/repositories/base.repository';
import { User } from './user';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from 'src/core/models/skill';

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

  public async getById(id: number): Promise<User | null> {
    return this.model.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Skill,
          through: { attributes: [] },
        },
      ],
    });
  }

  public async findAll(): Promise<User[]> {
    return this.model.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Skill,
          through: { attributes: [] },
        },
      ],
    });
  }
}
