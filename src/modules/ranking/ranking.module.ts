import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RankingService } from "./ranking.service";
import { RankingController } from "./ranking.controller";
import { Ranking } from "./entities/ranking.entity";
import { NewsModule } from "../news/news.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Ranking]), NewsModule, AuthModule],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
