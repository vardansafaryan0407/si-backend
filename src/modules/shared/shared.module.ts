import {Module} from '@nestjs/common';
import {CountriesModule} from "./countries/countries.module";
import {RolesModule} from "./roles/roles.module";
import {SkillsModule} from "./skills/skills.module";
import { IndustriesModule } from './industries/industries.module';

@Module({
    imports: [
        CountriesModule,
        RolesModule,
        SkillsModule,
        IndustriesModule,
    ]
})
export class SharedModule {
}
