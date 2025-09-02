import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InviteStatus } from './connection-invite';
import { ConnectionRepository } from './connection.repository';
import { UserRepository } from '../user/user.repository';
import { ConnectInviteRepository } from './connect-invite.repository';

@Injectable()
export class ConnectionsService {
  constructor(
    private userRepository: UserRepository,
    private connectionRepository: ConnectionRepository,
    private connectInviteRepository: ConnectInviteRepository,
  ) {}

  async sendInvite(senderId: number, receiverId: number) {
    if (senderId === receiverId) {
      throw new BadRequestException('Yoy cant send an yourself');
    }

    const receiver = await this.userRepository.findById(receiverId);
    if (!receiver) throw new NotFoundException('Not found');

    const existingConnection = await this.connectionRepository.findOne({
      where: { userId: senderId, friendId: receiverId },
    });
    if (existingConnection)
      throw new BadRequestException('User is already a friend');

    const existingInvite = await this.connectInviteRepository.findOne({
      where: { senderId, receiverId, status: InviteStatus.PENDING },
    });
    if (existingInvite)
      throw new BadRequestException('the application has already been sent');

    return this.connectInviteRepository.create({
      senderId,
      receiverId,
      status: InviteStatus.PENDING,
    });
  }

  async acceptInvite(inviteId: number, userId: number) {
    const invite = await this.connectInviteRepository.findById(inviteId);
    if (!invite) throw new NotFoundException('Not found ');
    if (invite.receiverId !== userId) {
      throw new BadRequestException('you cant apply others application');
    }

    invite.status = InviteStatus.ACCEPTED;
    await invite.save();

    await this.connectionRepository.create({
      userId: invite.senderId,
      friendId: invite.receiverId,
    });
    await this.connectionRepository.create({
      userId: invite.receiverId,
      friendId: invite.senderId,
    });

    return invite;
  }

  async getRelationship(userId: number, targetUserId: number) {
    return await this.connectInviteRepository.getRelationship(
      userId,
      targetUserId,
    );
  }

  async rejectInvite(inviteId: number, userId: number) {
    const invite = await this.connectInviteRepository.findById(inviteId);
    if (!invite) throw new NotFoundException('not found');
    if (invite.receiverId !== userId) {
      throw new BadRequestException('You cant reject other application');
    }

    invite.status = InviteStatus.REJECTED;
    return invite.save();
  }

  async getFriends(userId: number) {
    return this.connectionRepository.getFriends(userId);
  }

  async getInvites(userId: number) {
    return this.connectInviteRepository.getInvites(userId);
  }
}
