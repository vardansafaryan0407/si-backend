import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'premium_users', timestamps: true })
export class PremiumUser extends Model<PremiumUser> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  user_id: number;

  @Column({
    type: DataType.ENUM('premium', 'default'),
    allowNull: false,
    defaultValue: 'default',
  })
  status: 'premium' | 'default';
}
