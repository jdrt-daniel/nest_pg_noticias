import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRankingDto {
  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsString()
  noticeId: string;
}
