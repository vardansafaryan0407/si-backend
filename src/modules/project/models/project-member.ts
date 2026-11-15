import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Project } from '../project';
import { User } from '../../user/user';
import { ProjectPosition } from './project-position';
import { ProjectPositionApplication } from './project-position-application';
import { Country } from '../../../core/models/country';
import { Skill } from 'src/core/models/skill';
import { Role } from 'src/core/models/role';
import { BelongsToManyAddAssociationsMixin } from 'sequelize';
import { Equity } from './equity';

@Table({ timestamps: true, tableName: 'project_members' })
export class ProjectMember extends Model<ProjectMember> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'project',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  project_id: number;

  @BelongsTo(() => Project)
  project: Project;

  @ForeignKey(() => ProjectPosition)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'project_positions',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  position_id: number;

  @BelongsTo(() => ProjectPosition)
  position: ProjectPosition;

  @ForeignKey(() => ProjectPositionApplication)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'project_position_applications',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  application_id: number;

  @BelongsTo(() => ProjectPositionApplication)
  application: ProjectPositionApplication;

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
  country_id: number;

  @BelongsTo(() => Country)
  country: Country;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'role',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Equity, { as: 'equity', foreignKey: 'member_id' })
  equity: Equity;

  @Column({
    type: DataType.ENUM('active', 'inactive', 'removed'),
    allowNull: false,
    defaultValue: 'active',
  })
  status: 'active' | 'inactive' | 'removed';

  @BelongsToMany(() => Skill, {
    through: 'project_member_skills',
    foreignKey: 'member_id',
    otherKey: 'skill_id',
  })
  skills: Skill[];

  public declare addSkills: BelongsToManyAddAssociationsMixin<Skill, number>;
}
