import { Column, DataType,  Model,Table, Unique } from "sequelize-typescript";

@Table({tableName : 'user'})
export class User extends Model<User> {

 
    @Column({type: DataType.INTEGER,autoIncrement: true,primaryKey : true})
    id: number;

    @Column({type: DataType.STRING(50), allowNull: false})
    firstName: string;

    @Column({type: DataType.STRING(100),  allowNull: false})
    lastName: string;

    @Column({type: DataType.STRING(50),allowNull: false})
    location: string;

    @Unique({ name: 'email', msg: 'This email is already registered, please sign in' })
    @Column({type: DataType.STRING(50),allowNull: false})
    email: string;

    @Column({ type: DataType.STRING(255), allowNull: false})
    password: string;
}
