import { Controller, Get, Param } from "@nestjs/common";
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
  getPostById(@Param("id") id: number) {
    const post = this.service.getPost(id);

    return post;
  }
}
