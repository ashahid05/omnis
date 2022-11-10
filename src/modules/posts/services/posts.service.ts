import { Injectable } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PrismaService } from "@root/prisma.service";

type CreatePostType = {
  author_id: string;
  title: string;
  content: string;
  rating?: string;
};

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchPosts() {
    return await this.prisma.post.findMany({
      include: { author: { select: { name: true } } },
    });
  }

  async fetchPostById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { name: true } } },
    });
    return post;
  }

  async fetchPostsByAuthor(author_id: string) {
    return await this.prisma.post.findMany({
      where: { author_id },
      include: { author: { select: { name: true } } },
    });
  }

  async createPost({
    author_id,
    title,
    content,
    rating,
  }: CreatePostType): Promise<Post> {
    const post = await this.prisma.post.create({
      data: { content, title, rating, author_id },
    });
    console.log(post);

    return post;
  }
}
