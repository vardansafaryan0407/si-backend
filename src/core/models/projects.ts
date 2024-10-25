import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Users } from "./users";      
import { Countries } from "./countries";

@Table
export class Projects extends Model<Projects> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: 'VARCHAR(50)',
        allowNull: false
    })
    title: string;

    @Column({
        type: 'VARCHAR(100)',
        allowNull: false
    })
    description: string;

    @ForeignKey(() => Users)
    @Column({
        type: 'INT',
        allowNull: false
    })
    owner_id: number;

    @ForeignKey(() => Countries)
    @Column({
        type: 'INT',
        allowNull: false
    })
    country_id: number;
}
