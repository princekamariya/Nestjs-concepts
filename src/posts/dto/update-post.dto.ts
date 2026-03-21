// posts/dto/update-post.dto.ts
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  content?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  authorName?: string;
}
