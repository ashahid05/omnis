import { Logger, Module, OnApplicationBootstrap } from "@nestjs/common";
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
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { port: 3002 },
        });
      },
    },
  ],
})
export class PostsModule implements OnApplicationBootstrap {
  @Client({ transport: Transport.TCP, options: { port: 3002 } })
  client: ClientProxy;

  async onApplicationBootstrap() {
    await this.client.connect();
    Logger.log("Microservice started", "AWS");
  }
}
