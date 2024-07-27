import {IPaginationParams} from "../interfaces/pagination";
import {Type} from "class-transformer";

export class Pagination implements IPaginationParams{
    @Type(()=> Number)
    page? = 0

    @Type(()=> Number)
    limit?=20

}