import { Column, ForeignKey,Table, Model, DataType } from "sequelize-typescript";
import { Skill } from "./skill";
import { User } from "src/user/user";

@Table({tableName : "user-skill"})
export class UserSkill extends Model<UserSkill> {


    @Column({type: DataType.INTEGER,autoIncrement : true, primaryKey : true })
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER,allowNull: false})
    user_id: number;

    @ForeignKey(() => Skill)
    @Column({ type: DataType.INTEGER,allowNull: false})
    skill_id: number;

    @Column({type: DataType.STRING(30),allowNull: false})
    skill_level: string;
}
