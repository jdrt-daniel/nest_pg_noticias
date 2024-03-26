import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateNewsDto, UpdateNewsDto } from "./dto";
import { News } from "./entities/news.entity";
import { User } from "../users/entities/user.entity";
import { FilesService } from "../files/files.service";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly fileServide: FilesService,
  ) {}

  async create(createNewsDto: CreateNewsDto, user: User): Promise<News> {
    try {
      const newNotice = this.newsRepository.create(createNewsDto);
      newNotice.user = user;
      return await this.newsRepository.save(newNotice);
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return `This action returns all news`;
  }

  async findOne(id: string): Promise<News> {
    const notice = await this.newsRepository.findOneBy({ id });
    if (!notice)
      throw new NotFoundException(`Registry with id ${id} not found`);
    return notice;
  }

  async update(
    id: string,
    updateNewsDto: UpdateNewsDto,
    user: User,
  ): Promise<News> {
    const notice = await this.findOne(id);
    try {
      notice.user = user;
      const updateNotice = this.newsRepository.merge(notice, updateNewsDto);

      return await this.newsRepository.save(updateNotice);
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    return await this.newsRepository.update(id, { isActive: false });
  }

  private handleError(error: any): never {
    if (error.code == "23505") throw new BadRequestException(error.detail);
    throw new InternalServerErrorException("Please check server logs");
  }
}
