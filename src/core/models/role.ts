import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ProjectMember } from "src/modules/project/models/project-member";
@Table({ tableName: 'role', timestamps: false })
export class Role extends Model<Role> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @HasMany(() => ProjectMember)
    projectMember : ProjectMember
}
