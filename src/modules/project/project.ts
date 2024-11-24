import {
    AutoIncrement, BelongsTo,
    Column,
    DataType,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {ProjectMember} from "./models/project-member";
import {Industry} from "../../core/models/industry";
import {Country} from "../../core/models/country";


@Table({tableName:'project'})
export class Project extends Model<Project> {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number

    @Column
    title: string

    @Column
    description: string

    @BelongsTo(() => Industry, 'industry_id')
    industry: Industry

    @BelongsTo(() => Country, 'country_id')
    location: Country

    @HasMany(() => ProjectMember)
    members: ProjectMember[]
}
