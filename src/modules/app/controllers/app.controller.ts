import { Controller, Get } from "@nestjs/common";
import { Base } from "@utils/decorators";

@Controller()
@Base()
export class AppController {
  @Get()
  getHello(): string {
    return "hello wrold";
  }
}
