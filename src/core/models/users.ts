import { AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class Users extends Model<Users> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: 'VARCHAR(50)',
        allowNull: false
    })
    firstName: string;

    @Column({
        type: 'VARCHAR(100)',
        allowNull: false
    })
    lastName: string;

    @Column({
        type: 'VARCHAR(50)',
        allowNull: false
    })
    location: string;

    @Unique({ name: 'email', msg: 'This email is already registered, please sign in' })
    @Column({
        type: 'VARCHAR(50)',
        allowNull: false
    })
    email: string;

    @Column({
        type: 'VARCHAR(255)',
        allowNull: false
    })
    password: string;
}
