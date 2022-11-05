import { HttpExceptionFilter } from "@filters/http-exception.filter";
import { PostgresExceptionFilter } from "@filters/postgres-exception.filter";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "@pipes/validation.pipe";

import * as fs from "fs";
import * as YAML from "js-yaml";
import * as path from "path";
import { UserModule } from "../user/user.module";
import { AppController } from "./controllers/app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "development" ? ".env.development" : ".env",
      load: [
        () => {
          const YAML_CONFIG_FILENAME =
            process.env.NODE_ENV === "development"
              ? "config.development.yaml"
              : "config.yaml";
          const rawYaml = fs
            .readFileSync(
              path.join(__dirname, "..", "..", "..", YAML_CONFIG_FILENAME),
            )
            .toString("utf-8");
          const config = YAML.load(rawYaml);
          return config;
        },
      ],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: PostgresExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
    // { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
