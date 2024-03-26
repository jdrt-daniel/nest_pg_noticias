import { join } from "path";
import { existsSync } from "fs";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CloudinaryService } from "nestjs-cloudinary";

@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  getStaticImage(name: string) {
    const path = join(__dirname, "../../../static/news/", name);
    if (!existsSync(path))
      throw new BadRequestException(`File with name ${name} not found`);
    return path;
  }

  async uploadImage(file: Express.Multer.File) {
    return await this.cloudinaryService.uploadFile(file);
  }
}
