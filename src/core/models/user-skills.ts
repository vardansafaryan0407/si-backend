import { AutoIncrement, Column, ForeignKey, PrimaryKey, Table, Model, DataType } from "sequelize-typescript";
import { User } from "./users";
import { Skill } from "./skills";

@Table({tableName : "userskill"})
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
