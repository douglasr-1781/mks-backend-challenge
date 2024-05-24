import { IsNotEmpty } from "class-validator";

export class MovieDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    genre: string;
    
    @IsNotEmpty()
    year: number;
}