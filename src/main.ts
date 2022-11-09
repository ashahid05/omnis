import { LoggingInterceptor } from "@interceptors/logging.interceptor";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "@app/app.module";
import { PrismaService } from "./prisma.service";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import * as session from "express-session";
import * as passport from "passport";
import { config } from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalInterceptors(new LoggingInterceptor());
  const configService = app.get(ConfigService);

  const documentConfig = new DocumentBuilder()
    .setTitle("Nest.js API")
    .setDescription("This is a startup API for the future project")
    .addTag("api")
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup("api", app, document);
  const corsConfig = configService.get<{
    origin: string[];
    credentials: boolean;
  }>("app.cors");

  app.enableCors(corsConfig);

  app.use(
    session({
      name: configService.get<string>("app.cookie.name"),
      store: new PrismaSessionStore(new PrismaService(), {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
      secret: configService.get<string>("SESSION_SECRET"),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: configService.get<number>("app.cookie.age"),
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const port = configService.get<number>("app.port");
  await app.listen(port);
}
bootstrap();
