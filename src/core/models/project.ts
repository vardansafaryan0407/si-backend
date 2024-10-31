import { BelongsTo, Column, DataType, ForeignKey, Model,Table } from "sequelize-typescript";
import { User } from "src/modules/user/user";
import { Country } from "./country";

@Table({tableName : 'project'})

export class Project extends Model<Project> {

    @Column({ type: DataType.INTEGER,autoIncrement : true, primaryKey : true })
    id: number;

    @Column({ type: DataType.STRING(50), allowNull: false })
    title: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    description: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    owner_id: number;

    @ForeignKey(() => Country)
    @Column({ type: DataType.INTEGER, allowNull: false })
    country_id: number;

    @BelongsTo(() => User,{foreignKey : 'onwer_id'})
    owner: User;

}
