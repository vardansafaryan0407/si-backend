import {Module} from '@nestjs/common';
import {CountriesModule} from "./countries/countries.module";
import {RolesModule} from "./roles/roles.module";
import {SkillsModule} from "./skills/skills.module";

@Module({
    imports: [
        CountriesModule,
        RolesModule,
        SkillsModule,
    ]
})
export class SharedModule {
}
