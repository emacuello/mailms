import { PartialType } from '@nestjs/mapped-types';
import { CreateMailWelcomeDto } from './create-mail.dto';

export class UpdateMailDto extends PartialType(CreateMailWelcomeDto) {
  id: number;
}
