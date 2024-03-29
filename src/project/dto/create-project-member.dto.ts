import {IsNotEmpty} from "class-validator";

export class CreateProjectMemberDto {
    @IsNotEmpty()
    equity: {
        min: number;
        max: number
    }

    @IsNotEmpty()
    role: number

    @IsNotEmpty()
    location: number
}
