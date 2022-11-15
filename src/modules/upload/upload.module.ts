import { Module } from "@nestjs/common";
import { UploadController } from "./controllers/upload.controller";
import { UploadService } from "./services/upload.service";

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
