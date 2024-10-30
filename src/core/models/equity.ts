import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName : 'equity'})
export class Equity extends Model<Equity> {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    min_percent: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    max_percent: number;

    @Column({ type: DataType.INTEGER, allowNull: true })
    actual_percent: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    project_members_id: number;
}
