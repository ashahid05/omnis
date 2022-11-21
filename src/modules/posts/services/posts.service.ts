import { Inject, Injectable } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PrismaService } from "@root/prisma.service";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

type CreatePostType = {
  author_id: string;
  title: string;
  content: string;
  image?: string;
  rating?: string;
};

@Injectable()
export class PostsService {
  constructor(
    @Inject("AWS") private readonly client: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

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
    image,
    rating,
  }: CreatePostType): Promise<Post> {
    const post = await this.prisma.post.create({
      data: { content, title, rating, author_id, image },
    });
    console.log(post);

    return post;
  }

  async uploadImage(
    ownerID: string,
    buffer: Buffer,
    mimetype: string,
  ): Promise<{ success: boolean; objectKey: string }> {
    const res = await lastValueFrom(
      this.client.send(
        { cmd: "upload", dest: "posts" },
        { body: buffer.toString("base64"), mimetype, owner: ownerID },
      ),
    );

    return res;
  }
}