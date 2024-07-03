import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from '../config/config.nodemailer';
@Module({
  imports: [MailerModule.forRoot(MailerConfig)],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
