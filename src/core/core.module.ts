import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Location} from "./models/location";
import {Industry} from "./models/industry";
import {Role} from "./models/role";

@Module({
    imports: [
        SequelizeModule.forFeature([Location, Industry, Role])
    ]
})
export class CoreModule {
}
