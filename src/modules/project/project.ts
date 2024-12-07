import { AutoIncrement,Column, DataType,ForeignKey,HasMany, HasOne, Model, PrimaryKey, Table,} from "sequelize-typescript";
  import { ProjectMember } from "./models/project-member";
import { Country } from "src/core/models/country";
import { Industry } from "src/core/models/industry";

  @Table({ tableName: 'project', timestamps: false })
  export class Project extends Model<Project> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;
  
    @Column({ allowNull: false })
    title: string;
  
    @Column({ allowNull: false })
    description: string;
    
    @HasMany(() => ProjectMember)
    members: ProjectMember[];

    @ForeignKey(() => Industry)
    @Column
    industries : number


    @ForeignKey(() => Country)
    @Column
    location : number

  }
  