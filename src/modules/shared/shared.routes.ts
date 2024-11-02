import {Routes} from "@nestjs/core";
import {SharedModule} from "./shared.module";
import {CountriesModule} from "./countries/countries.module";
import {RolesModule} from "./roles/roles.module";
import {SkillsModule} from "./skills/skills.module";

export const sharedRoutes: Routes = [{
    path: '/shared',
    module: SharedModule,
    children: [
        {
            path: '/countries',
            module: CountriesModule
        },
        {
            path: '/roles',
            module: RolesModule
        },
        {
            path: '/skills',
            module: SkillsModule
        }
    ]
}]
