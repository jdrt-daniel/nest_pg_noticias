import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/modules/users/entities/user.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly userService: UsersService,
    configService: ConfigService,
  ) {
    console.log(configService.get("JWT_SECRET"));
    super({
      secretOrKey: "TestObservable",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findOne(payload.id);

    if (!user) throw new UnauthorizedException("Token not valid");

    if (!user.isActive) throw new UnauthorizedException("User is inactive");

    return user;
  }
}
