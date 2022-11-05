import { LoggingInterceptor } from "@interceptors/logging.interceptor";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./modules/app/app.module";
import { PrismaService } from "./prisma.service";

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

  const port = configService.get<number>("app.port");
  await app.listen(port);
}
bootstrap();
