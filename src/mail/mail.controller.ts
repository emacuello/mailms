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
  async createMailWelcome(@Payload() createMailDto: CreateMailWelcomeDto) {
    return await this.mailService.createMailWelcome(createMailDto);
  }

  @MessagePattern({ cmd: 'createMailContact' })
  async createMailContact(@Payload() contactMail: ContactMailPortafolio) {
    return await this.mailService.createMailContact(contactMail);
  }
  @MessagePattern({ cmd: 'createMailContact2' })
  async createMailContact2(@Payload() contactMail: ContactMailPortafolio) {
    return this.mailService.createMailContact2(contactMail);
  }

  @MessagePattern({ cmd: 'createMailPayment' })
  async createMailPayment(@Payload() order: OrderMail) {
    return await this.mailService.createMailPayment(order);
  }

  @MessagePattern({ cmd: 'createMailAppointment' })
  async createMailAppointment(@Payload() newAppointment: CreateAppointment) {
    return await this.mailService.createMailAppointment(newAppointment);
  }

  @MessagePattern({ cmd: 'createMailAppointmentChange' })
  async createMailAppointmentChange(@Payload() appointment: ChangeAppointment) {
    return await this.mailService.createMailAppointmentChange(appointment);
  }
}
