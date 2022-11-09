import { IUsersService } from "@modules/users/services/users.service";
import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject("USERS_SERVICE") private readonly usersService: IUsersService,
  ) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    try {
      const userDB = await this.usersService.fetchUser(user.id);

      delete userDB.password;
      delete userDB.salt;

      return userDB ? done(null, userDB) : done(null, null);
    } catch (error) {
      done(error, null);
    }
  }
}
