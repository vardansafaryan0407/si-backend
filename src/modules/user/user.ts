import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Country } from 'src/core/models/country';
import { Skill } from 'src/core/models/skill';
import { Project } from '../project/project';
import { UserSkill } from 'src/core/models/user-skill';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  lastName: string;

  @Unique({
    name: 'email',
    msg: 'This email is already registered, please sign in',
  })
  @Column({ type: DataType.STRING(50), allowNull: false })
  email: string;

  @BelongsTo(() => Country)
  country: Country;

  @Column
  @ForeignKey(() => Country)
  country_id: number;

  @BelongsToMany(() => Skill, () => UserSkill)
  skills: Skill[];

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @HasMany(() => Project, { foreignKey: 'owner_id' })
  projects: Project[];
}
