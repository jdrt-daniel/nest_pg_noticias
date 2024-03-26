import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        isActive: true,
        id: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    try {
      const userUpdate = this.userRepository.merge(user, updateUserDto);
      return await this.userRepository.save(userUpdate);
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepository.update(id, { isActive: false });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.code == "23505") throw new BadRequestException(error.detail);
    throw new InternalServerErrorException("Please check server logs");
  }
}
