import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "@root/prisma.service";

type CreateUserType = {
  username: string;
  email: string;
  age: number;
};

export interface IUserService {
  fetchUser(id: number): Promise<User | null>;
  createUser(data: CreateUserType): Promise<User>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly prisma: PrismaService) {}
  async fetchUser(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async createUser({ username, email, age }: CreateUserType): Promise<User> {
    const user = await this.prisma.user.create({
      data: { username, email, age },
    });
    return user;
  }
}
