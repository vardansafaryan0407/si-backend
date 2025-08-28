import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user';

@Table({ tableName: 'connections' })
export class Connection extends Model<Connection> {
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  friendId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => User, 'friendId')
  friend: User;
}
