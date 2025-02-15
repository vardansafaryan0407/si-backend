import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'project-management', timestamps: false })
export class ProjectManagement extends Model<ProjectManagement> {
  @PrimaryKey
  @Column
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  description: string;
}
