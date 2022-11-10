import { AuthenticatedGuard } from "@modules/auth/utils/local.guard";
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { IUsersService } from "../services/users.service";

@Controller("users")
export class UserController {
  constructor(
    @Inject("USERS_SERVICE") private readonly service: IUsersService,
  ) {}

  @Get("@me")
  @UseGuards(AuthenticatedGuard)
  async getSelfUser(@Req() request: Request) {
    return request.user;
  }

  @Get(":id")
  async getUserById(@Param("id") userID: string) {
    const user = await this.service.fetchUser(userID);
    if (!user) {
      throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Get(":id/posts")
  async getUserPosts(@Param("id") userId: string) {
    const posts = await this.service.fetchUserPosts(userId);
    return posts;
  }
  @Post("create")
  async createUser(@Body() data: CreateUserDto) {
    const user = await this.service.createUser(data);
    return user;
  }
}
