import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/user';

@Table({ tableName: 'messages' })
export class Message extends Model<Message> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  senderId!: number;

  @BelongsTo(() => User, 'senderId')
  sender!: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  receiverId!: number;

  @BelongsTo(() => User, 'receiverId')
  receiver!: User;

  @Column({ type: DataType.TEXT, allowNull: false })
  text!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt!: Date;
}
