import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 30)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(50, 1000)
  content: string;

  @IsString()
  @Length(3, 15)
  rating: string;
}
