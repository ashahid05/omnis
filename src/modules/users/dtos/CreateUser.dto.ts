import { Type } from "class-transformer";
import { IsString, Length, IsNotEmpty, IsEmail, Min } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  first_name: string;

  @IsString()
  @Length(3, 20)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 13)
  password: string;

  @Type(() => Number)
  @IsNotEmpty()
  @Min(13)
  readonly age: number;
}
