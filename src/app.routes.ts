import {Routes} from "@nestjs/core";
import {sharedRoutes} from "./modules/shared/shared.routes";

export const appRoutes: Routes = [
    ...sharedRoutes
]
