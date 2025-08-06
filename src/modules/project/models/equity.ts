import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProjectPosition } from './project-position';

@Table({ timestamps: true, tableName: 'equity' })
export class Equity extends Model<Equity> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Default(0)
  @Column({ type: DataType.INTEGER, allowNull: false })
  min: number;

  @Default(0)
  @Column({ type: DataType.INTEGER, allowNull: false })
  max: number;

  @Default(0)
  @Column({ type: DataType.INTEGER, allowNull: true })
  actual_percent: number;

  @ForeignKey(() => ProjectPosition)
  @Column
  project_position_id: number;

  @BelongsTo(() => ProjectPosition)
  projectPosition: ProjectPosition;
}
