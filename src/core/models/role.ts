import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class Role extends Model<Role> {

    @PrimaryKey
    @Column({autoIncrement: true})
    id: number

    @Column({allowNull: false})
    name: string
}

