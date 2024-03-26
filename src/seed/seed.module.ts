import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { UsersModule } from "src/modules/users/users.module";
import { NewsModule } from "src/modules/news/news.module";

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UsersModule, NewsModule],
})
export class SeedModule {}
