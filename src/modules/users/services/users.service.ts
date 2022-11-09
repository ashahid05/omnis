import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "@root/prisma.service";
import * as bcrypt from "bcrypt";

type CreateUserType = {
  username: string;
  password: string;
  email: string;
  age: number;
};

export interface IUsersService {
  fetchUser(id: string): Promise<User | null>;
  fetchUserByUsername(username: string): Promise<User | null>;
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
  async fetchUserByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    delete user?.password;
    delete user?.salt;
    return user;
  }

  async createUser({
    username,
    password,
    email,
    age,
  }: CreateUserType): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await this.prisma.user.create({
      data: { username, password: hashedPassword, salt, email, age },
    });

    delete user.password;
    delete user.salt;

    return user;
  }
}
