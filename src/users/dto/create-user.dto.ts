import {type ROLE } from "../users.controller.js";
import { IsEmail, IsEnum, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', "ADMIN"], {message: 'Valid Role Required'})
  role: ROLE
}