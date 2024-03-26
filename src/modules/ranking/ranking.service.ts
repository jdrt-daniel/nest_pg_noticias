import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateRankingDto } from "./dto/create-ranking.dto";
import { Ranking } from "./entities/ranking.entity";

import { News } from "../news/entities/news.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepository: Repository<Ranking>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(createRankingDto: CreateRankingDto, user: User) {
    try {
      const notice = await this.newsRepository.findOneBy({
        id: createRankingDto.noticeId,
      });
      const ranking = this.rankingRepository.create(createRankingDto);
      ranking.user = user;
      ranking.news = notice;
      return await this.rankingRepository.save(ranking);
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }
}
