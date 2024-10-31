import {IsOptional, IsString, IsNumber, Min, Max} from 'class-validator';
import {Equity} from "../models/equity";

export class SearchDto {
    @IsOptional()
    @IsString()
    query?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    industryId?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    locationId?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    roleId?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    offset?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(50)
    limit?: number;

    @IsOptional()
    equity?: { min?: number, max?: number };
}
