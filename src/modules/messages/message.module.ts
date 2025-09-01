import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './message';
import { User } from '../user/user';
import { MessagesService } from './message.service';
import { MessagesController } from './message.controler';
import { MessagesGateway } from './message.gateway';
import { MessageRepository } from './message.repository';
import { UserRepository } from '../user/user.repository';
import { ConnectionsModule } from '../connections/connections.module';

@Module({
  imports: [SequelizeModule.forFeature([Message, User]), ConnectionsModule],
  providers: [
    MessagesService,
    MessagesGateway,
    MessageRepository,
    UserRepository,
  ],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
