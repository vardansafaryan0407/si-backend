import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Connection } from './connection';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/user';

@Injectable()
export class ConnectionRepository extends BaseRepository<Connection> {
  constructor(@InjectModel(Connection) model: typeof Connection) {
    super(model);
  }

  async getFriends(userId: number) {
    return this.model.findAll({
      where: { userId },
      include: [{ model: User, as: 'friend' }],
    });
  }
}
