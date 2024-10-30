import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName : 'roles'})
export class Role extends Model<Role> {

    @Column({ type: DataType.INTEGER, autoIncrement: true,primaryKey : true})
    id: number;

    @Column({ type: DataType.STRING,allowNull: false})
    name: string;
}
