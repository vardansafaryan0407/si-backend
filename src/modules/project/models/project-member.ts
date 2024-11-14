import {Column, ForeignKey, HasOne, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Equity} from "./equity";
import {Project} from "../project";
import {Country} from "../../../core/models/country";

@Table({timestamps: true, tableName: 'project_members'})
export class ProjectMember extends Model<ProjectMember> {
    @PrimaryKey
    @Column({autoIncrement: true})
    id: number;

    @ForeignKey(() => Country)
    @Column
    country: number

    @HasOne(() => Equity)
    equity: Equity

    @ForeignKey(() => Project)
    @Column
    public projectId: number
}
