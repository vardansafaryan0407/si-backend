import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'location'})
export class Location extends Model<Location> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number

    @Column({allowNull: false})
    name: string
}

