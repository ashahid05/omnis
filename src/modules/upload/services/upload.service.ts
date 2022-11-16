import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { S3 } from "aws-sdk";
import * as crypto from "crypto";
import { InjectAwsService } from "nest-aws-sdk";

@Injectable()
export class UploadService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async uploadImage(
    body: Buffer,
    metadata: Record<string, string>,
    mimetype: string,
    dest: string,
  ) {
    try {
      const key = crypto.randomBytes(16).toString("hex");

      const res = await this.s3
        .putObject({
          Bucket: "abdullah.gg",
          Key: `omnis/${dest}/${key}`,
          ContentType: mimetype,
          Body: body,
          Metadata: metadata,
        })
        .promise();

      return { key, ...res };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
