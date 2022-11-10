import { Type } from "class-transformer";
import {
  IsString,
  Length,
  IsNotEmpty,
  IsEmail,
  Min,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+ [a-zA-Z]+$/, { message: "'name' must be full name" })
  @Length(5, 35)
  name: string;

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
