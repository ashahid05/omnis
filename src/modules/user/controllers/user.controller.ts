import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { IUserService } from "../services/user.service";

@Controller("user")
export class UserController {
  constructor(@Inject("USER_SERVICE") private readonly service: IUserService) {}

  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) userID: number) {
    const user = await this.service.fetchUser(userID);
    if (!user) {
      throw new HttpException(
        `User with ID ${userID} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @Post("create")
  async createUser(@Body() data: CreateUserDto) {
    const user = await this.service.createUser(data);
    return user;
  }
}
