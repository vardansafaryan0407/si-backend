import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {ProjectService} from "./services/project.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {query} from "express";
import {SearchDto} from "./dto/search-project.dto";

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
    async listProjects(@Query() query: SearchDto) {
        try {
            return await this.projectService.searchProjects(query)
        } catch (error) {

        }
    }

}
