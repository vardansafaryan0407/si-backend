import {
  AutoIncrement,
  BeforeCreate,
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
import { POSITION_LIFETIME_DAYS } from '../../../core/constants/app.constants';

/** What is stored: the owner's decision. */
export type PositionStatus = 'open' | 'closed';
/** What a visitor sees: an open position past its date counts as expired. */
export type PositionState = PositionStatus | 'expired';

/** The moment a position posted (or reopened) at `from` stops being listed. */
export function positionExpiry(from: Date): Date {
  return new Date(
    from.getTime() + POSITION_LIFETIME_DAYS * 24 * 60 * 60 * 1000,
  );
}

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

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({
    type: DataType.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open',
  })
  status: PositionStatus;

  // Remote by default; `country` then says where applicants should be based.
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  is_remote: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  expires_at: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  closed_at: Date | null;

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

  // Every way a position gets created (with its project, or added later) starts the
  // same clock, so no caller has to remember to.
  @BeforeCreate
  static startLifetime(position: ProjectPosition) {
    if (!position.expires_at) {
      position.expires_at = positionExpiry(new Date());
    }
  }

  /** Closed by the owner, expired by date, or open. */
  currentState(now: Date = new Date()): PositionState {
    if (this.status === 'closed') {
      return 'closed';
    }
    if (
      this.expires_at &&
      new Date(this.expires_at).getTime() <= now.getTime()
    ) {
      return 'expired';
    }
    return 'open';
  }
}
