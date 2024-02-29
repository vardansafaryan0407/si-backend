import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class Industry extends Model<Industry> {

    @PrimaryKey
    @Column({autoIncrement: true})
    id: number

    @Column({allowNull: false})
    name: string
}

