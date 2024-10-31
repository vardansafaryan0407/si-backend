import {Column, ForeignKey, HasOne, Model, PrimaryKey, Sequelize, Table} from "sequelize-typescript";
import {Equity} from "./equity";
import {Location} from "../../../core/models/location";
import {Project} from "../project";

@Table({timestamps: true, tableName:'project_members'})
export class ProjectMember extends Model<ProjectMember> {
    @PrimaryKey
    @Column({autoIncrement: true})
    id: number;

    @ForeignKey(() => Location)
    @Column
    location: number

    @HasOne(() => Equity)
    equity: Equity

    @ForeignKey(() => Project)
    @Column
    public projectId: number
}
