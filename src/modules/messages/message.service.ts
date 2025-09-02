import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './create-message.dto';
import { MessageRepository } from './message.repository';
import { UserRepository } from '../user/user.repository';
import { ConnectionRepository } from '../connections/connection.repository';

@Injectable()
export class MessagesService {
  constructor(
    private messageRepository: MessageRepository,
    private userRepository: UserRepository,
    private connectionRepository: ConnectionRepository,
  ) {}

  async canSendMessage(senderId: number, receiverId: number) {
    const sender = await this.userRepository.getById(senderId);
    if (!sender) throw new BadRequestException('Sender not found');

    if (sender.premium) return true;

    const connection = await this.connectionRepository.findOne({
      where: { userId: senderId, friendId: receiverId },
    });

    if (!connection) {
      throw new BadRequestException(
        'You can only send messages to your friends',
      );
    }

    return true;
  }

  async sendMessage(senderId: number, dto: CreateMessageDto) {
    await this.canSendMessage(senderId, dto.receiverId);

    return this.messageRepository.sendMessage(senderId, dto);
  }

  async getConversation(
    userId: number,
    partnerId: number,
    offset = 0,
    limit = 50,
  ) {
    return this.messageRepository.getConversation(
      userId,
      partnerId,
      offset,
      limit,
    );
  }

  async getPartners(userId: number) {
    return this.messageRepository.getPartners(userId);
  }
}
