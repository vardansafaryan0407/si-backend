import {  Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./users";
import { Equity } from "./equity";
import { Role } from "./roles";
import {Project} from "./projects"

@Table({tableName : 'projectmember'})
export class ProjectMember extends Model<ProjectMember> {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    user_id: number;

    @ForeignKey(() => Equity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    equity_id: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    role_id: number;

    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER, allowNull: false })
    projects_id: number;
}
