import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Country } from 'src/core/models/country';
import { Skill } from 'src/core/models/skill';
import { Project } from '../project/project';
import { BelongsToManyAddAssociationsMixin } from 'sequelize';
import { PremiumUser } from './premium-user';
import { Message } from 'src/modules/messages/message';
import { Connection } from '../connections/connection';
import { ConnectInvite } from '../connections/connection-invite';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

/** Attributes that must never leave the API, whatever endpoint returns a user. */
export const USER_PRIVATE_ATTRIBUTES = [
  'password',
  'resetPasswordToken',
  'resetPasswordExpires',
] as const;

/** A copy of a user's values without the credential attributes. */
export function withoutPrivateAttributes<T extends object>(values: T): T {
  const copy = { ...values } as Record<string, unknown>;
  for (const attribute of USER_PRIVATE_ATTRIBUTES) {
    delete copy[attribute];
  }
  return copy as T;
}

// Queries leave the credential columns out unless they ask for them through
// `User.unscoped()` (sign-in and password reset do, see UserRepository). The scope also
// applies when a user is joined into another query, for example the applicant of an
// application or the owner of a project.
@DefaultScope(() => ({
  attributes: { exclude: [...USER_PRIVATE_ATTRIBUTES] },
}))
@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  description: string;

  @Unique({
    name: 'email',
    msg: 'This email is already registered, please sign in',
  })
  @Column({ type: DataType.STRING(50), allowNull: false })
  email: string;

  @HasMany(() => ConnectInvite, 'senderId')
  sentInvites: ConnectInvite[];

  @HasMany(() => ConnectInvite, 'receiverId')
  receivedInvites: ConnectInvite[];

  @BelongsToMany(() => User, () => Connection, 'userId', 'friendId')
  friends: User[];

  @BelongsTo(() => Country)
  country: Country;

  @Column
  @ForeignKey(() => Country)
  country_id: number;

  @BelongsToMany(() => Skill, {
    through: 'user_skills',
    foreignKey: 'user_id',
    otherKey: 'skill_id',
  })
  skills: Skill[];

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'reset_password_token',
  })
  resetPasswordToken: string;

  @HasMany(() => Message, 'senderId')
  sentMessages: Message[];

  @HasMany(() => Message, 'receiverId')
  receivedMessages: Message[];

  @HasOne(() => PremiumUser, {
    foreignKey: 'user_id',
    as: 'premium',
    onDelete: 'CASCADE',
  })
  premium: PremiumUser;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'reset_password_expires',
  })
  resetPasswordExpires: Date;

  @HasMany(() => Project, { foreignKey: 'owner_id' })
  projects: Project[];

  @Column({ allowNull: true })
  url: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    allowNull: false,
    defaultValue: Role.USER,
  })
  role: Role;

  public declare setSkills: BelongsToManyAddAssociationsMixin<Skill, number>;

  /**
   * Second line of defence behind the default scope: an instance that does hold the
   * credentials (one just created at sign-up, or loaded unscoped) still serializes
   * without them. Code that needs the hash reads the attribute from the instance.
   */
  toJSON<T extends User>(): T {
    return withoutPrivateAttributes(super.toJSON<T>());
  }
}
