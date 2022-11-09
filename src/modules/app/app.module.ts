import { HttpExceptionFilter } from "@filters/http-exception.filter";
import { PostgresExceptionFilter } from "@filters/postgres-exception.filter";
import { AuthModule } from "@modules/auth/auth.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "@pipes/validation.pipe";
import { PassportModule } from "@nestjs/passport";

import * as fs from "fs";
import * as Joi from "joi";
import * as YAML from "js-yaml";
import * as path from "path";
import { UsersModule } from "../users/users.module";
import { AppController } from "./controllers/app.controller";
import { PostsModule } from "@modules/posts/posts.module";

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
      validationSchema: Joi.object({
        // .env
        NODE_ENV: Joi.string()
          .valid("production", "development")
          .default("development"),
        POSTGRES_URL: Joi.string().required(),

        // config.yaml
        app: Joi.object({
          port: Joi.number().default(3000),
          cors: Joi.object({
            origin: Joi.array().required(),
            credentials: Joi.boolean().required(),
          }),
        }),
      }),
    }),
    PassportModule.register({ session: true }),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: PostgresExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
