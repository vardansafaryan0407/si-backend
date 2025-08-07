import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Project } from '../project';
import { Country } from '../../../core/models/country';
import { Skill } from 'src/core/models/skill';
import { Role } from 'src/core/models/role';
import { ProjectPositionApplication } from './project-position-application';
import { BelongsToManyAddAssociationsMixin } from 'sequelize';
import { Equity } from './equity';

@Table({ timestamps: true, tableName: 'project_positions' })
export class ProjectPosition extends Model<ProjectPosition> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  country: number;

  @BelongsTo(() => Country)
  country_id: Country;

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

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  project_id?: number;

  @BelongsTo(() => Project)
  project: Project;

  @HasOne(() => Equity, { foreignKey: 'project_position_id' })
  equity: Equity;

  @BelongsToMany(() => Skill, {
    through: 'project_position_skills',
    foreignKey: 'position_id',
    otherKey: 'skill_id',
  })
  skills: Skill[];

  @HasMany(() => ProjectPositionApplication)
  applications: ProjectPositionApplication[];

  public declare addSkills: BelongsToManyAddAssociationsMixin<Skill, number>;
}
