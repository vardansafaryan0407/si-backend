import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import { Project } from "src/modules/project/project";

@Table({tableName: 'industry', timestamps:false})
export class Industry extends Model<Industry> {


    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type:DataType.STRING,allowNull: false})
    name: string

    @HasMany(() => Project)
    projects: Project[];
}

