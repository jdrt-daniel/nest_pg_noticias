import { Controller, Post, Body } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import { Auth, GetUser } from "src/auth/decorator";
import { User } from "../users/entities/user.entity";
import { ValidRoles } from "src/auth/interface";

@ApiTags("Comentarios")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @Auth(ValidRoles.suscriptor)
  create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User) {
    return this.commentsService.create(createCommentDto, user);
  }
}
