import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateUserDto, UpdateUserDto } from "./dto";
import { UsersService } from "./users.service";

import { Auth } from "src/auth/decorator";
import { ValidRoles } from "src/auth/interface";

@ApiTags("Usuarios")
@Controller("users")
@Auth(ValidRoles.admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
