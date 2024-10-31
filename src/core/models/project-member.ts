import {  BelongsTo, Column, DataType, ForeignKey, Model,Table } from "sequelize-typescript";
import { Equity } from "./equity";
import { Role } from "./role";
import {Project} from "./project"
import { User } from "src/modules/user/user";

@Table({tableName : 'project-member'})
export class ProjectMember extends Model<ProjectMember> {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    user_id: number;

    @BelongsTo(() => User, { foreignKey: 'user_id' })
    user : User;
    

    @ForeignKey(() => Equity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    equity_id: number;

    @BelongsTo(() => Equity, { foreignKey: 'equity_id' })
    equity : Equity;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    role_id: number;

    @BelongsTo(() => Role, { foreignKey: 'role_id' })
    role : Role;

    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER, allowNull: false })
    projects_id: number;

    @BelongsTo(() => Project,{ foreignKey: 'user_id' })
    project : Project


    
}
