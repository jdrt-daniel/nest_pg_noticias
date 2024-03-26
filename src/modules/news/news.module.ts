import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { News } from "./entities/news.entity";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { FilesModule } from "../files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([News]), FilesModule, AuthModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [TypeOrmModule, NewsService],
})
export class NewsModule {}
