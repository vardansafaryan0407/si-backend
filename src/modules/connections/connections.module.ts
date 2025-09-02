import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user';
import { Connection } from './connection';
import { ConnectionsService } from './connections.service';
import { ConnectionsController } from './connections.controller';
import { ConnectInvite } from './connection-invite';
import { ConnectionRepository } from './connection.repository';
import { UserRepository } from '../user/user.repository';
import { ConnectInviteRepository } from './connect-invite.repository';

@Module({
  imports: [SequelizeModule.forFeature([User, Connection, ConnectInvite])],
  providers: [
    ConnectionsService,
    ConnectionRepository,
    UserRepository,
    ConnectInviteRepository,
  ],
  controllers: [ConnectionsController],
  exports: [ConnectionsService, ConnectionRepository],
})
export class ConnectionsModule {}
