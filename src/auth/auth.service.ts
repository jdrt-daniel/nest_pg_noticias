import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { UsersService } from "src/modules/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "./interface/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginUserDto: LoginAuthDto) {
    const { email, password } = loginUserDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user)
      throw new UnauthorizedException("Credentials are not valid (email)");

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException("Credentials are not valid (pasword)");
    delete user.password;
    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
