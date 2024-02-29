import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class Location extends Model<Location> {

    @PrimaryKey
    @Column({autoIncrement: true})
    id: number

    @Column({allowNull: false})
    name: string
}

