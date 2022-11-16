import { Module, OnApplicationBootstrap } from "@nestjs/common";
import {
  Client,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { PrismaService } from "@root/prisma.service";
import { PostsController } from "./controllers/posts.controller";
import { PostsService } from "./services/posts.service";

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [
    PostsService,
    PrismaService,
    {
      provide: "AWS",
      useFactory: () => {
        return ClientProxyFactory.create({ transport: Transport.TCP });
      },
    },
  ],
})
export class PostsModule implements OnApplicationBootstrap {
  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
