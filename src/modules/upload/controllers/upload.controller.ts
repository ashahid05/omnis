import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UploadFileDto } from "../dtos/UploadFile.dto";
import { UploadService } from "../services/upload.service";

@Controller()
export class UploadController {
  constructor(private readonly service: UploadService) {}

  @MessagePattern({ cmd: "upload", dest: "posts" })
  async handleFileUpload(@Payload() data: UploadFileDto) {
    const { owner, body, mimetype } = data;

    const res = await this.service.uploadFile(
      Buffer.from(body, "base64"),
      { owner },
      mimetype,
      "posts",
    );

    return {
      success: true,
      objectKey: res.key,
    };
  }
}
