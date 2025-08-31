import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { ConnectInvite, InviteStatus } from './connection-invite';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/user';

@Injectable()
export class ConnectInviteRepository extends BaseRepository<ConnectInvite> {
  constructor(@InjectModel(ConnectInvite) model: typeof ConnectInvite) {
    super(model);
  }

  public async getInvites(userId: number) {
    return this.model.findAll({
      where: { receiverId: userId, status: InviteStatus.PENDING },
      include: [{ model: User, as: 'sender' }],
    });
  }
}
