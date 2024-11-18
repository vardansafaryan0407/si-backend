import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import { Industry } from 'src/core/models/industry';
import { IndustryService } from './industries.service';
import { IndustryRepository } from './industries.repository';
import { IndustryController } from './industries.controlles';

@Module({
    imports: [SequelizeModule.forFeature([Industry])],
    providers: [IndustryService, IndustryRepository],
    exports: [IndustryService, IndustryRepository],
    controllers: [IndustryController]
})
export class IndustriesModule {
}
