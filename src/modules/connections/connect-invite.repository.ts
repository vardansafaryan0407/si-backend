import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { ConnectInvite, InviteStatus } from './connection-invite';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/user';
import { Op } from 'sequelize';
import { ConnectionRepository } from './connection.repository';

@Injectable()
export class ConnectInviteRepository extends BaseRepository<ConnectInvite> {
  constructor(
    @InjectModel(ConnectInvite) model: typeof ConnectInvite,
    private connectionRepository: ConnectionRepository,
  ) {
    super(model);
  }

  public async getInvites(userId: number) {
    return this.model.findAll({
      where: { receiverId: userId, status: InviteStatus.PENDING },
      include: [{ model: User, as: 'sender' }],
    });
  }

  public async getRelationship(userId: number, targetUserId: number) {
    if (userId === targetUserId) {
      throw new BadRequestException(
        'You cannot check relationship with yourself',
      );
    }

    const connection = await this.connectionRepository.findOne({
      where: { userId, friendId: targetUserId },
    });
    if (connection) return { status: 'friend' };

    const invite = await this.model.findOne({
      where: {
        status: InviteStatus.PENDING,
        [Op.or]: [
          { senderId: userId, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: userId },
        ],
      },
    });

    if (invite) return { status: 'invite' };

    return { status: 'none' };
  }
}
