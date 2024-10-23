import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Countries extends Model<Countries> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: 'VARCHAR(100)',
        allowNull: false
    })
    country: string;

    @Column({
        type: 'VARCHAR(10)',
        allowNull: false
    })
    country_code: string;
}
