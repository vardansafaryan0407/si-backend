import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "src/core/repositories/base.repository";
import { Equity } from "src/project/models/equity";

@Injectable()

export class EquityRepository extends BaseRepository<Equity>{
    constructor(@InjectModel(Equity) model :typeof Equity){
        super(model)
    }
}