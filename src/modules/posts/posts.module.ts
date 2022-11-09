import { Module } from "@nestjs/common";
import { PrismaService } from "@root/prisma.service";
import { PostsController } from "./controllers/posts.controller";
import { PostsService } from "./services/posts.service";

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
