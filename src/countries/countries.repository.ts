import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Countries } from "src/core/models/countries";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()

export class CountriesRepository extends BaseRepository<Countries>{
    constructor (@InjectModel(Countries) model : typeof Countries ){
        super(model)
    }
}