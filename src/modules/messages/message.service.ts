import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './create-message.dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessagesService {
  constructor(private messageRepository: MessageRepository) {}

  async sendMessage(senderId: number, dto: CreateMessageDto) {
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
