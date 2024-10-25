import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table
export class Skills extends Model<Skills>{


    @PrimaryKey
    @AutoIncrement
    @Column
    id :number;

    @Column({
        type : 'VARCHAR(50)',
        allowNull : false
    })
    skill_name : string;
}