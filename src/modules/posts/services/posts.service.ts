import { Injectable } from "@nestjs/common";
import { PrismaService } from "@root/prisma.service";

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly posts = [
    {
      id: 1,
      authorId: 1,
      title: "My first ever post!",
      content: "My first ever post content!",
      rating: "Popular",
      created_at: new Date("2020/7/10"),
    },
    {
      id: 2,
      authorId: 2,
      title: "Learn React.js",
      content: "Today we will learn how to fetch content using react js",
      rating: "Technology",
      created_at: new Date("2020/9/11"),
    },
    {
      id: 3,
      authorId: 1,
      title: "Global warming",
      rating: "Design",
      content: "Today we will talk about global warming",
      created_at: new Date("2021/5/21"),
    },
  ];

  fetchPosts() {
    return this.posts;
  }
  getPost(id: number) {
    return this.posts.find((post) => post.id == id);
  }
}
