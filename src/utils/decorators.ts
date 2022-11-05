import { applyDecorators, UsePipes } from "@nestjs/common";
import { ValidationPipe } from "@pipes/validation.pipe";

const BaseDecorators = [UsePipes(new ValidationPipe())];

export const Base = () => applyDecorators(...BaseDecorators);
