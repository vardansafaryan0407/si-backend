import {Column, Model, Table, Unique} from 'sequelize-typescript';
import {isEmail} from "class-validator";

@Table({timestamps: true})
export class User extends Model<User> {
    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Unique({name:'email', msg:'This email is already registered, please signin'})
    @Column({allowNull: false,  primaryKey: true})
    email: string;

    @Column({allowNull: false})
    password: string
}
