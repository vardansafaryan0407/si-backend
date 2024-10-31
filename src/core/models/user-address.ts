import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Country } from "./country";
import { User } from "./user";

@Table({tableName : 'user-address'})
export class UserAddress extends Model<UserAddress> {

    @Column({  type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER,allowNull: false})
    user_id: number;

    @ForeignKey(() => Country)
    @Column({ type: DataType.INTEGER,allowNull: false})
    country_id: number;

    @Column({ type: DataType.INTEGER, allowNull: false})
    zip_code: number;

    @Column({ type: DataType.STRING(30),allowNull: false})
    address_line_1: string;

    @Column({ type: DataType.STRING(30),allowNull: true})
    address_line_2: string;

    @Column({ type: DataType.STRING(60), allowNull: false})
    city: string;
}
