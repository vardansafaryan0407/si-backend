import {
    AutoIncrement, BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {ProjectMember} from "./models/project-member";
import {Industry} from "../../core/models/industry";
import {Country} from "../../core/models/country";


@Table({tableName:'project',timestamps : false})
export class Project extends Model<Project> {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number

    @Column
    title: string

    @Column
    description: string
  

    @ForeignKey(() => Country) 
    @Column({type: DataType.INTEGER,allowNull: false})
    country_id : number;

    @BelongsTo(() => Country, 'country_id') 
    country: Country;

    @ForeignKey(() => Industry)
    @Column({type: DataType.INTEGER,allowNull: false})
    industry_id : number


    @BelongsTo(() => Industry,'industry_id')
    industry : Industry


    @HasMany(() => ProjectMember)
    members: ProjectMember[]
}
