import {
  IsString,
  Length,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  Min,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(13)
  age: number;
}
