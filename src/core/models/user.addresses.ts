import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Countries } from "./countries";
import { Users } from "./users";

@Table
export class UserAddresses extends Model<UserAddresses>{

    @PrimaryKey
    @AutoIncrement
    @Column
     id : number;


    @ForeignKey(()=> Users)
    @Column({
        type : 'INT',
        allowNull : false
    })
    user_id : number

    @ForeignKey(()=> Countries)
    @Column({
        type : 'INT',
        allowNull : false
    })
    country_id : number


    @Column({
        type : 'VARCHAR(40)',
        allowNull : false
    })
    zip_code : string

    @Column({
        type : 'VARCHAR(50)',
        allowNull : false
    })
    address_line_1 : string
    @Column({
        type : 'VARCHAR(50)',
        allowNull : false
    })
    address_line_2 : string

    @Column({
        type : 'VARCHAR(60)',
        allowNull : false
    })
    city : string

}