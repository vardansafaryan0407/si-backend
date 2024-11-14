import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'industry', timestamps:false})
export class Industry extends Model<Industry> {


    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number

    @Column({allowNull: false})
    name: string
}

