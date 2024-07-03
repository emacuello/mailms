import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';
import {
  ChangeAppointment,
  ContactMailPortafolio,
  CreateAppointment,
  CreateMailWelcomeDto,
  OrderMail,
} from './dto/create-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'createMailWelcome' })
  createMailWelcome(@Payload() createMailDto: CreateMailWelcomeDto) {
    return this.mailService.createMailWelcome(createMailDto);
  }

  @MessagePattern({ cmd: 'createMailContact' })
  createMailContact(@Payload() contactMail: ContactMailPortafolio) {
    return this.mailService.createMailContact(contactMail);
  }

  @MessagePattern({ cmd: 'createMailPayment' })
  createMailPayment(@Payload() order: OrderMail) {
    return this.mailService.createMailPayment(order);
  }

  @MessagePattern({ cmd: 'createMailAppointment' })
  createMailAppointment(@Payload() newAppointment: CreateAppointment) {
    return this.mailService.createMailAppointment(newAppointment);
  }

  @MessagePattern({ cmd: 'createMailAppointmentChange' })
  createMailAppointmentChange(@Payload() appointment: ChangeAppointment) {
    return this.mailService.createMailAppointmentChange(appointment);
  }
}
