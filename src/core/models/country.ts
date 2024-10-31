import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName : 'country'})
export class Country extends Model<Country> {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING(100), allowNull: false })
    country_name: string;

    @Column({ type: DataType.STRING(10), allowNull: false })
    country_code: string;
}
