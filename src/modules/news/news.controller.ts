import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { ApiTags } from "@nestjs/swagger";
import { Auth, GetUser } from "src/auth/decorator";
import { User } from "../users/entities/user.entity";
import { ValidRoles } from "src/auth/interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileFilter } from "../files/helpers";
import { FilesService } from "../files/files.service";

@ApiTags("Noticias")
@Controller("news")
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly filseStore: FilesService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: FileFilter,
    }),
  )
  @Auth(ValidRoles.redactor, ValidRoles.admin)
  async create(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() createNewsDto: CreateNewsDto,
    @GetUser() user: User,
  ) {
    const fileUpload = await this.filseStore.uploadImage(file);
    createNewsDto.image = fileUpload.url;
    return this.newsService.create(createNewsDto, user);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get("recents")
  findRecents() {
    return this.newsService.findRecents();
  }

  @Get("search")
  findByTitle(@Query() search) {
    console.log(search);
    return this.newsService.findByTitle(search.title);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("file"))
  @Auth(ValidRoles.redactor, ValidRoles.admin)
  async update(
    @UploadedFile()
    file: Express.Multer.File,
    @Param("id") id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @GetUser() user: User,
  ) {
    if (file) {
      const fileUpload = await this.filseStore.uploadImage(file);
      updateNewsDto.image = fileUpload.url;
    }

    return this.newsService.update(id, updateNewsDto, user);
  }

  @Delete(":id")
  @Auth(ValidRoles.redactor, ValidRoles.admin)
  async remove(@Param("id") id: string) {
    return await this.newsService.remove(id);
  }
}
