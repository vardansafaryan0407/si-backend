import { AutoIncrement, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProjectMember } from "src/modules/project/models/project-member";
import { Project } from "src/modules/project/project";
@Table({ tableName: 'country', timestamps: false })
export class Country extends Model<Country> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(10), allowNull: false })
  code: string;


    @HasOne(() => Project)
    project : Project

    @HasOne(() => ProjectMember)
    projectMember : ProjectMember

}