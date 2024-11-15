import {Column, DataType, Model, Table} from "sequelize-typescript";


@Table({tableName: 'skill', timestamps:false})
export class Skill extends Model<Skill> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING(50), allowNull: false})
    name: string;
}
