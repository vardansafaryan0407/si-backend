import {IsNotEmpty} from "class-validator";
import {CreateProjectMemberDto} from "./create-project-member.dto";

export class CreateProjectDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    industries: number[];

    @IsNotEmpty()
    members: CreateProjectMemberDto[]
}
