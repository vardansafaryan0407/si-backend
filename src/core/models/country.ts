import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";


@Table({tableName: 'country', timestamps: false})
export class Country extends Model<Country> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column({type: DataType.STRING(100), allowNull: false})
    name: string;

    @Column({type: DataType.STRING(10), allowNull: false})
    code: string;
}
