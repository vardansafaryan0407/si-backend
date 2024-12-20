import {
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import {ProjectMember} from "./models/project-member";
import {Country} from "src/core/models/country";
import {Industry} from "src/core/models/industry";

@Table({tableName: 'project', timestamps: false})
export class Project extends Model<Project> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column({allowNull: false})
    title: string;

    @Column({allowNull: false})
    description: string;

    @HasMany(() => ProjectMember)
    members: ProjectMember[];

    @BelongsTo(() => Country)
    country: Country

    @ForeignKey(() => Country)
    @Column(DataType.INTEGER)
    country_id: number

    @BelongsToMany(() => Industry, {through: 'project_industries', foreignKey: 'project_id', otherKey: 'industry_id'})
    industries: Industry[]
}
