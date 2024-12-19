import {BelongsToMany, Column, ForeignKey, HasOne, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Equity} from "./equity";
import {Project} from "../project";
import {Country} from "../../../core/models/country";
import { Skill } from "src/core/models/skill";
import { Role } from "src/core/models/role";

@Table({timestamps: true, tableName: 'project_members'})
export class ProjectMember extends Model<ProjectMember> {
    @PrimaryKey
    @Column({autoIncrement: true})
    id: number;

    @ForeignKey(() => Country)
    @Column
    country: number

    @ForeignKey(() => Role)
    @Column
    role : number

    @HasOne(() => Equity)
    equity: Equity

    @ForeignKey(() => Project)
    @Column
    public projectId: number

    @BelongsToMany(()=>Skill, {through: 'project_members_skills', foreignKey:'member_id', otherKey:' skill_id'})
    skills: Skill[]

}
