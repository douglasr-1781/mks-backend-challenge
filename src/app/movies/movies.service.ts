import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesEntity } from './movies.entity';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(MoviesEntity)
        private readonly moviesRepository: Repository<MoviesEntity>
    ) {}

    async findAll() {
        return await this.moviesRepository.find({
            select: ['title', 'genre', 'year']
        });
    }

    async findOneOrFail(id: string) {
        try{
            return await this.moviesRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async store(data: MovieDto) {
        const movie = this.moviesRepository.create(data);
        return await this.moviesRepository.save(movie);
    }

    async update(id: string, data: MovieDto) {
        const movie = await this.findOneOrFail(id);
        this.moviesRepository.merge(movie, data);
        return await this.moviesRepository.save(movie);
    }

    async destroy(id: string) {
        await this.findOneOrFail(id);
        this.moviesRepository.softDelete({ id });
    }
}
