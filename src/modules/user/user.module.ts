import { Module } from "@nestjs/common";
import { PrismaService } from "@root/prisma.service";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: "USER_SERVICE", useClass: UserService },
  ],
})
export class UserModule {}
