import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProjectPosition } from './project-position';
import { User } from 'src/modules/user/user';

@Table({ timestamps: true, tableName: 'project_invite' })
export class ProjectInvite extends Model<ProjectInvite> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  message: string;

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
}
