import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IUsersService } from "@modules/users/services/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @Inject("USERS_SERVICE") private readonly usersService: IUsersService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.usersService.fetchUserByUsername(username, true);

    if (!user) {
      throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND);
    }

    const matched = bcrypt.compareSync(password, user.password);

    if (matched) {
      delete user.password;
      delete user.salt;

      return user;
    }
    console.log("Passwords dont match");

    return null;
  }
}
