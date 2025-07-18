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
import { Country } from '../../../core/models/country';
import { Skill } from 'src/core/models/skill';
import { Role } from 'src/core/models/role';
import { ProjectPositionApplication } from './project-position-application';
import { BelongsToManyAddAssociationsMixin } from 'sequelize';

@Table({ timestamps: true, tableName: 'project_positions' })
export class ProjectPosition extends Model<ProjectPosition> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

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

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  project_id: number;

  @BelongsTo(() => Project)
  project: Project;

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
  equity_percentage: number;

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
