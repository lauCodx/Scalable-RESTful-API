import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {
    @IsInt()
    @Type(()=> Number)
    @Min(1)
    @IsOptional()
    page?: number = 1;
    
    @IsInt()
    @Type(()=> Number)
    @Min(1)
    @IsOptional()
    limit?: number = 10;
}