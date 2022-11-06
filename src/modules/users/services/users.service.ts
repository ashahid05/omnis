import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "@root/prisma.service";

type CreateUserType = {
  username: string;
  email: string;
  age: number;
};

export interface IUsersService {
  fetchUser(id: string): Promise<User | null>;
  createUser(data: CreateUserType): Promise<User>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly prisma: PrismaService) {}
  async fetchUser(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async createUser({ username, email, age }: CreateUserType): Promise<User> {
    const user = await this.prisma.user.create({
      data: { username, email, age },
    });
    return user;
  }
}
