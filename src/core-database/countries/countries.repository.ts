import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Country } from "src/core/models/country";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()

export class CountriesRepository extends BaseRepository<Country>{
    constructor (@InjectModel(Country) model : typeof Country ){
        super(model)
    }
}