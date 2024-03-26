import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { News } from "../news/entities/news.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User) {
    try {
      const notice = await this.newsRepository.findOneBy({
        id: createCommentDto.noticeId,
      });
      const comment = this.commentRepository.create(createCommentDto);
      comment.user = user;
      comment.news = notice;
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }
}
