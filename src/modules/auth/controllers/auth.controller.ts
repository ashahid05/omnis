import { Controller, Get, Post, Req, Session, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/local.guard";

@Controller("auth")
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() request: Request) {
    return request.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get("session")
  async getAuthSession(@Session() session: Record<string, any>) {
    return session;
  }
}
