import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table
export class Roles extends Model<Roles>{

    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;


    @Column({
     type : 'VARCHAR(50)',
     allowNull : false
    })
    name : string


    
}