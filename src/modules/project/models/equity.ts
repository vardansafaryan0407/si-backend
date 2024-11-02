import {AutoIncrement, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ProjectMember} from "./project-member";

@Table({timestamps: true, tableName: 'equity'})
export class Equity extends Model<Equity> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Default(0)
    @Column(DataType.INTEGER)
    min: number;

    @Default(0)
    @Column(DataType.INTEGER)
    max: number

    @Column({})
    @ForeignKey(() => ProjectMember)
    member: number
}
