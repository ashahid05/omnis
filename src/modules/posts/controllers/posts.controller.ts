import { User } from "@decorators/user.decorator";
import { AuthenticatedGuard } from "@modules/auth/utils/local.guard";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreatePostDto } from "../dtos/CreatePost.dto";
import { PostsService } from "../services/posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly service: PostsService) {}
  @Get()
  getPosts() {
    const posts = this.service.fetchPosts();

    return posts;
  }

  @Get(":id")
  async getPostById(@Param("id", ParseIntPipe) id: number) {
    const post = await this.service.fetchPostById(id);

    return post;
  }

  @Post("create")
  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPost(@User("id") userID: string, @Body() data: CreatePostDto) {
    const post = await this.service.createPost({ ...data, author_id: userID });

    return post;
  }
}
