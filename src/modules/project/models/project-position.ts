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
import { Equity } from './equity';
import { Project } from '../project';
import { Country } from '../../../core/models/country';
import { Skill } from 'src/core/models/skill';
import { Role } from 'src/core/models/role';
import { BelongsToManyAddAssociationsMixin } from 'sequelize';

@Table({ timestamps: true, tableName: 'project_positions' })
export class ProjectPosition extends Model<ProjectPosition> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

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

  @BelongsTo(() => Project)
  project: Project;

  @HasMany(() => Equity, { as: 'equity', foreignKey: 'member_id' })
  equity: Equity;

  @ForeignKey(() => Project)
  @Column
  public projectId: number;

  @BelongsToMany(() => Skill, {
    through: 'project_members_skills',
    foreignKey: 'member_id',
    otherKey: 'skill_id',
  })
  skills: Skill[];

  public declare addSkills: BelongsToManyAddAssociationsMixin<Skill, number>;
}
