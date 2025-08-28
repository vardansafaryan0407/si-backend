import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user';

export enum InviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Table({ tableName: 'connect_invites' })
export class ConnectInvite extends Model<ConnectInvite> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  senderId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  receiverId: number;

  @Column({
    type: DataType.ENUM(...Object.values(InviteStatus)),
    defaultValue: InviteStatus.PENDING,
  })
  status: InviteStatus;

  @BelongsTo(() => User, 'senderId')
  sender: User;

  @BelongsTo(() => User, 'receiverId')
  receiver: User;
}
