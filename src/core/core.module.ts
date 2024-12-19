import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Industry} from "./models/industry";
import {Role} from "./models/role";
import {Country} from "./models/country";
import { Skill } from "./models/skill";

@Module({
    imports: [
        SequelizeModule.forFeature([Country, Industry, Role,Skill])
    ]
})
export class CoreModule {
}
