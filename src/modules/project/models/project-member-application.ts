import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/user';
import { ProjectMember } from './project-member';

@Table({ tableName: 'project_member_applications', timestamps: true })
export class ProjectMemberApplication extends Model<ProjectMemberApplication> {
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

  @BelongsTo(() => ProjectMember)
  project_member: ProjectMember;

  @ForeignKey(() => ProjectMember)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'project_members',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  member_id: number;

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
  status: 'pending';
}
