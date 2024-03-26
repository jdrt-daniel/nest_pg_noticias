import { Response } from "express";
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { CloudinaryService } from "nestjs-cloudinary";

import { FilesService } from "./files.service";
import { FileFilter, FileNamer } from "./helpers";

@ApiTags("Archivos")
@Controller("files")
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: FileFilter,
      // limits: { fileSize: 5 * 1000 },
      storage: diskStorage({
        destination: "./static/news",
        filename: FileNamer,
      }),
    }),
  )
  async uploadNewsFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException("Make sure that file is a image");
    }
    return file;
  }

  @Post("multiple")
  @UseInterceptors(
    FilesInterceptor("files[]", 5, {
      fileFilter: FileFilter,
      // limits: { fileSize: 5 * 1000 },
      storage: diskStorage({
        destination: "./static/uploads",
        filename: FileNamer,
      }),
    }),
  )
  uploadNultileFiles(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    if (!files) {
      throw new BadRequestException("Make sure that file is a image");
    }

    return files;
  }

  @Post("cloudinary")
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: FileFilter,
    }),
  )
  async uploadCloudinaryFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException("Make sure that file is a image");
    }
    return await this.cloudinaryService.uploadFile(file, {
      resource_type: "image",
    });
  }

  @Get(":name")
  findFileByName(@Res() res: Response, @Param("name") name: string) {
    const path = this.filesService.getStaticImage(name);

    res.sendFile(path);
    // return path;
  }

  handleError(error: any) {
    throw new BadRequestException(error);
  }
}
