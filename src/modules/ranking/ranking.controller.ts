import { Controller, Post, Body } from "@nestjs/common";
import { RankingService } from "./ranking.service";
import { CreateRankingDto } from "./dto/create-ranking.dto";
import { ApiTags } from "@nestjs/swagger";
import { Auth, GetUser } from "src/auth/decorator";
import { User } from "../users/entities/user.entity";
import { ValidRoles } from "src/auth/interface";

@ApiTags("Calificacion")
@Controller("ranking")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  @Auth(ValidRoles.suscriptor)
  create(@Body() createRankingDto: CreateRankingDto, @GetUser() user: User) {
    return this.rankingService.create(createRankingDto, user);
  }
}
