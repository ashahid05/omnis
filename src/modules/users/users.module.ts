import { Module } from "@nestjs/common";
import { PrismaService } from "@root/prisma.service";
import { UserController } from "./controllers/user.controller";
import { UsersService } from "./services/users.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: "USERS_SERVICE", useClass: UsersService },
  ],
})
export class UsersModule {}
