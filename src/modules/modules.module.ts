import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [NewsModule, CommentsModule, UsersModule, FilesModule, RankingModule]
})
export class ModulesModule {}
