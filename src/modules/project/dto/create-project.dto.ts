import {IsNotEmpty} from "class-validator";
import {CreateProjectMemberDto} from "./create-project-member.dto";

export class CreateProjectDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    industry: number;
     
    @IsNotEmpty()
    location : number;
 
    @IsNotEmpty()
    skills : number;

    @IsNotEmpty()
    members: CreateProjectMemberDto[]
}
