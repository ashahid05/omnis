import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/local.guard";

@Controller("auth")
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() request: Request) {
    return {
      ...request.user,
      session: { ...request.session.cookie, id: request.session.id },
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get("session")
  async getAuthSession(@Session() session: Record<string, any>) {
    return session;
  }

  @Post("logout")
  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logUserOut(@Req() request: Request) {
    request.logOut({ keepSessionInfo: false }, () => void 0);
  }
}
