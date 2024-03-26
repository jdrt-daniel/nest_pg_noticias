import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}
