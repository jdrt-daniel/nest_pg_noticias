import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { CloudinaryModule } from "nestjs-cloudinary";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    CloudinaryModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        cloud_name: configService.get("CLOUDINARY_API_NAME"),
        api_key: configService.get("CLOUDINARY_API_KEY"),
        api_secret: configService.get("CLOUDINARY_API_SECRET"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
