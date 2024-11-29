import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { Project } from "src/modules/project/project";

@Table({tableName: 'country', timestamps:false})
export class Country extends Model<Country> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING(100), allowNull: false})
    name: string;

    @Column({type: DataType.STRING(10), allowNull: false})
    code: string;

    @ForeignKey(() => Project)
    project_id : number

    @HasMany(() => Project)
    project : Project[]
}
