import { AutoIncrement, Column, ForeignKey, PrimaryKey, Table,Model } from "sequelize-typescript";


@Table
export class UserSkills extends Model<UserSkills> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Users)
    @Column({
        type: "INT",
        allowNull: false
    })
    user_id: number;

    @ForeignKey(() => Skills)
    @Column({
        type: "INT",
        allowNull: false
    })
    skill_id: number;

    @Column({
        type : 'VARCHAR(30)',
        allowNull : false
    })
    skill_level : string
}
