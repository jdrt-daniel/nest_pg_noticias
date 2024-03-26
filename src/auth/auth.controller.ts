import { Controller, Post, Body, Get } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginAuthDto } from "./dto/login-auth.dto";

import { Auth, GetUser } from "./decorator";
import { User } from "src/modules/users/entities/user.entity";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.registerUser(createAuthDto);
  }

  @Post("login")
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.loginUser(loginAuthDto);
  }

  @Get("check-token")
  @Auth()
  async checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get("private")
  @Auth()
  testPrivateRoute(@GetUser() user: User) {
    return user;
  }
}
