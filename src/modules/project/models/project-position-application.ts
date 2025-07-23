import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/user';
import { ProjectPosition } from './project-position';
import { ProjectMember } from './project-member';

@Table({ tableName: 'project_position_applications', timestamps: true })
export class ProjectPositionApplication extends Model<ProjectPositionApplication> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  user_id: number;

  @BelongsTo(() => ProjectPosition)
  project_position: ProjectPosition;

  @ForeignKey(() => ProjectPosition)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'project_positions',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  position_id: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: {
        args: [1],
        msg: 'Equity should be 1 percent minimum',
      },
      max: {
        args: [100],
        msg: 'Equity should be 100 percent maximum',
      },
    },
  })
  equity: number;

  @HasOne(() => ProjectMember, {
    foreignKey: 'application_id',
  })
  member: ProjectMember;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.ENUM('pending', 'rejected', 'approved'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: 'pending' | 'approved' | 'rejected';
}
