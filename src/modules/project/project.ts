import {AutoIncrement, BelongsTo, Column,DataType,ForeignKey, HasMany, Model,PrimaryKey,Table
} from"sequelize-typescript";
import {ProjectMember} from "./models/project-member";
import {Industry} from "../../core/models/industry";
import {Country} from "../../core/models/country";


@Table({tableName:'project'})
export class Project extends Model<Project> {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number

    @Column({type: DataType.STRING,allowNull: false})
    title: string

    @Column({type: DataType.STRING,allowNull: false})
    description: string
  

    @ForeignKey(() => Country) 
    @Column({type: DataType.INTEGER,allowNull: false})
    location : number;

  
    @ForeignKey(() => Industry)
    @Column({type: DataType.INTEGER,allowNull: false})
    industry : number


    @HasMany(() => ProjectMember)
    members: ProjectMember[]
}
