import { BaseRepository } from 'src/core/repositories/base.repository';
import { Message } from './message';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './create-message.dto';
import { Op } from 'sequelize';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class MessageRepository extends BaseRepository<Message> {
  constructor(
    @InjectModel(Message) model: typeof Message,
    private userRepository: UserRepository,
  ) {
    super(model);
  }

  async sendMessage(senderId: number, dto: CreateMessageDto) {
    return this.model.create({
      senderId,
      receiverId: dto.receiverId,
      text: dto.text,
    });
  }

  async getConversation(
    userId: number,
    partnerId: number,
    offset = 0,
    limit = 50,
  ) {
    return this.model.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: partnerId },
          { senderId: partnerId, receiverId: userId },
        ],
      },
      order: [['createdAt', 'ASC']],
      offset,
      limit,
    });
  }

  async getPartners(userId: number) {
    const messages = await this.model.findAll({
      where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
      attributes: ['senderId', 'receiverId'],
    });

    const partnerIds = new Set<number>();
    messages.forEach((m) => {
      if (m.senderId !== userId) partnerIds.add(m.senderId);
      if (m.receiverId !== userId) partnerIds.add(m.receiverId);
    });

    if (partnerIds.size === 0) return [];

    const partners = await this.userRepository.findAll({
      where: { id: [...partnerIds] },
      attributes: ['id', 'firstName', 'lastName'],
    });

    return partners.map((p) => ({
      id: p.id,
      name: `${p.firstName} ${p.lastName}`,
    }));
  }
}
