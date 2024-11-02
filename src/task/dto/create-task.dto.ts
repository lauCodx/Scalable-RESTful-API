import { IsString, IsOptional, IsDateString, IsArray, ArrayNotEmpty, IsIn, IsNotEmpty, Matches } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dueDate must be in the format YYYY-MM-DD',
  })
  dueDate: string;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'in-progress', 'completed'])
  status: 'pending' | 'in-progress' | 'completed';

  @IsOptional()
  @IsString()
  @IsIn(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags?: string[];
}