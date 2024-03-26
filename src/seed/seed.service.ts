import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "src/modules/news/entities/news.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Repository } from "typeorm";
import { initialData } from "./data/seed-data";

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();

    const firstUser = await this.insertUsers();

    await this.insertNews(firstUser);

    return "SEED EXECUTED";
  }

  private async deleteTables() {
    const queryNews = this.newsRepository.createQueryBuilder();
    const queryUsers = this.userRepository.createQueryBuilder();
    try {
      await queryNews.delete().where({}).execute();
      await queryUsers.delete().where({}).execute();
    } catch (error) {
      throw new InternalServerErrorException(error.detail);
    }
  }

  private async insertUsers() {
    const seedUser = initialData.users;
    const usersArr: User[] = [];
    seedUser.forEach((user) => {
      usersArr.push(this.userRepository.create(user));
    });

    await this.userRepository.save(usersArr);

    return usersArr[0];
  }

  private async insertNews(user: User) {
    const seedNews = initialData.news;

    const newsArr: News[] = [];

    seedNews.forEach((news: News) => {
      news.user = user;
      newsArr.push(this.newsRepository.create(news));
    });

    await this.newsRepository.save(newsArr);
  }
}
