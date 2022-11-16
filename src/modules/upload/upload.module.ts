import { Module } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { AwsSdkModule } from "nest-aws-sdk";
import { UploadController } from "./controllers/upload.controller";
import { UploadService } from "./services/upload.service";

@Module({
  imports: [AwsSdkModule.forFeatures([S3])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
