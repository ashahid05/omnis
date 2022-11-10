import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "@root/prisma.service";
import { Post } from "@prisma/client";
import * as bcrypt from "bcrypt";

type CreateUserType = {
  first_name: string;
  last_name?: string;
  password: string;
  email: string;
  age: number;
};

export interface IUsersService {
  fetchUser(id: string): Promise<User | null>;
  fetchUserByEmail(email: string, withPassword: boolean): Promise<User | null>;
  fetchUserPosts(userId: string): Promise<Post[]>;
  createUser(data: CreateUserType): Promise<User>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly prisma: PrismaService) {}
  async fetchUser(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    delete user?.password;
    delete user?.salt;
    return user;
  }
  async fetchUserByEmail(
    email: string,
    withPassword = false,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!withPassword) {
      delete user?.password;
      delete user?.salt;
    }
    return user;
  }

  async fetchUserPosts(userId: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: { author_id: userId },
      include: { author: { select: { first_name: true, last_name: true } } },
    });

    return posts;
  }

  async createUser({
    first_name,
    last_name,
    password,
    email,
    age,
  }: CreateUserType): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await this.prisma.user.create({
      data: {
        first_name,
        last_name,
        password: hashedPassword,
        salt,
        email,
        age,
      },
    });

    delete user.password;
    delete user.salt;

    return user;
  }
}
