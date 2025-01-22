import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProjectMember } from './models/project-member';
import { Country } from 'src/core/models/country';
import { Industry } from 'src/core/models/industry';
import { User } from '../user/user';

@Table({ tableName: 'project', timestamps: false })
export class Project extends Model<Project> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  description: string;

  @HasMany(() => ProjectMember)
  members: ProjectMember[];

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'country',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  country: number;

  @ForeignKey(() => Industry)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'industry',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  industries: number;

  @ForeignKey(() => User)
  @Column
  owner_id: number;

  @BelongsTo(() => User, { foreignKey: 'owner_id' })
  owner: User;
}
