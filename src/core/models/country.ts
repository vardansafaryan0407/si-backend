import {Column, DataType, HasMany,  HasOne,  Model, Table} from "sequelize-typescript";
import { Project } from "src/modules/project/project";
import { User } from "src/modules/user/user";

@Table({tableName: 'country', timestamps:false})
export class Country extends Model<Country> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING(100), allowNull: false})
    name: string;

    @Column({type: DataType.STRING(10), allowNull: false})
    code: string;

    @HasMany(() => Project)
    projects: Project[];

    @HasMany(() =>User)
    user : User[];

}
