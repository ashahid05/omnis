import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { IUsersService } from "../services/users.service";

@Controller("users")
export class UserController {
  constructor(
    @Inject("USERS_SERVICE") private readonly service: IUsersService,
  ) {}

  @Get(":id")
  async getUserById(@Param("id") userID: string) {
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
