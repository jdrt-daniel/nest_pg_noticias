import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { Comment } from "./entities/comment.entity";
import { NewsModule } from "../news/news.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), NewsModule, AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
