import { CreateUserDTO } from "./create-user.dto.js";
import {PartialType} from "@nestjs/mapped-types"

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}