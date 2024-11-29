import {BelongsTo, Column, DataType, Model, Table} from "sequelize-typescript";
import { Project } from "src/modules/project/project";

@Table({tableName: 'role', timestamps: false})
export class Role extends Model<Role> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @BelongsTo(() => Project,'project_id')
    project : Project
}
