import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';

@Controller('api/movies')
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async index() {
        return this.moviesService.findAll();
    }

    @Post()
    async store(@Body() body: MovieDto) {
        return this.moviesService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.moviesService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: MovieDto
    ) {
        return this.moviesService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.moviesService.destroy(id);
    }
}
