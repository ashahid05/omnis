import { User } from "@decorators/user.decorator";
import { AuthenticatedGuard } from "@modules/auth/utils/local.guard";
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
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
  @UseInterceptors(FileInterceptor("image"))
  async createPost(
    @User("id") userID: string,
    @Body() data: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 12000 }), // 1kb * 12 = 12MB
          new FileTypeValidator({
            fileType: /(image)\/(png|jpeg|avif|svg|webp+)/,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const uploadedImage = await this.service.uploadImage(
      userID,
      image.buffer,
      image.mimetype,
    );
    const post = await this.service.createPost({
      ...data,
      author_id: userID,
      image: uploadedImage.objectKey,
    });

    return post;
  }
}
