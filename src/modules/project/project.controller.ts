import {Body, Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {ProjectService} from "./services/project.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {AuthGuard} from "src/core/guards/auth.guard";
import {SearchDto} from "./dto/search-project.dto";
import {Pagination} from "../../core/models/pagination";

@UseGuards(AuthGuard)
@Controller('project')
export class ProjectController {

    constructor(private projectService: ProjectService) {
    }

    @Post('')
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<void> {
        try {
            await this.projectService.createProject(createProjectDto);
        } catch (error) {
            return error
        }
    }

    @Get('')
    async listProjects(@Query() query: SearchDto, @Query() pagination: Pagination) {
        try {
            return await this.projectService.searchProjects(query, pagination)
        } catch (error) {
            return error
        }
    }


    @Get(':id')
    async getId(@Param('id') id : number){
        return await this.projectService.findById(id)
    }
}
