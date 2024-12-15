import {BelongsTo, Column, DataType,HasMany,Model, Table} from "sequelize-typescript";
import { ProjectMember } from "src/modules/project/models/project-member";


@Table({tableName: 'skill', timestamps:false})
export class Skill extends Model<Skill> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING(50), allowNull: false})
    name: string;

    @HasMany(() => ProjectMember)
    projectMember : ProjectMember
}
