
import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Users } from "./users";
import { Equity } from "./equity";
import { Roles } from "./roles";
import { Projects } from "./projects";

@Table
export class ProjectMembers extends Model<ProjectMembers>{

@PrimaryKey
@AutoIncrement
@Column
id : number;


@ForeignKey(()=>Users)
@Column({
    type : 'INT',
    allowNull : false
})
user_id : number


@ForeignKey(()=>Equity)
@Column({
    type : 'INT',
    allowNull : false
})
equity_id : number

@ForeignKey(()=>Roles)
@Column({
    type : 'INT',
    allowNull : false
})
role_id : number

@ForeignKey(()=>Projects)
@Column({
    type : 'INT',
    allowNull : false
})
projects_id : number

}