import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import { Project } from "src/modules/project/project";

@Table({tableName: 'industry', timestamps:false})
export class Industry extends Model<Industry> {


    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number

    @Column({allowNull: false})
    name: string

    @HasMany(() => Project)
    project : Project[]
}

