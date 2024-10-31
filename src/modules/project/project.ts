import {
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import {ProjectMember} from "./models/project-member";
import {Industry} from "../../core/models/industry";
import {Location} from "../../core/models/location";

@Table
export class Project extends Model<Project> {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number

    @Column
    title: string

    @Column
    description: string

    @BelongsToMany(() => Industry, 'project_industries', 'project_id', 'industry_id')
    industries: Industry[]

    @BelongsToMany(() => Location, 'project_locations', 'project_id', 'location_id')
    locations: Location

    @HasMany(() => ProjectMember)
    members: ProjectMember[]
}
