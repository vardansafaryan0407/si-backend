import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Equity extends Model<Equity> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: 'INT',
        allowNull: false 
    })
    min_percent: number;

    @Column({
        type: 'INT',
        allowNull: false 
    })
    max_percent: number;

    @Column({
        type: 'INT', 
        allowNull: true 
    })
    actual_percent: number; 

    @Column({
        type: 'INT', 
        allowNull: false
    })
    project_members_id: number; 
}
