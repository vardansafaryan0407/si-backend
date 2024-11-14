import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Industry} from "./models/industry";
import {Role} from "./models/role";
import {Country} from "./models/country";

@Module({
    imports: [
        SequelizeModule.forFeature([Country, Industry, Role])
    ]
})
export class CoreModule {
}
