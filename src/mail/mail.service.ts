import { Injectable } from '@nestjs/common';
import {
  ChangeAppointment,
  ContactMailPortafolio,
  CreateAppointment,
  CreateMailWelcomeDto,
  OrderMail,
} from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { envs } from 'src/config/env';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async createMailWelcome(createMailDto: CreateMailWelcomeDto) {
    try {
      const result = await this.mailerService.sendMail({
        to: createMailDto.email,
        subject: 'Bienvenido a Emax Peluqueria',
        template: 'welcome',
        context: {
          name: createMailDto.name,
          appName: 'Emax Peluqueria',
        },
        attachments: [
          {
            filename: 'logo.png',
            path: envs.LOGO,
            cid: 'logo',
          },
        ],
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async createMailContact(contactMail: ContactMailPortafolio) {
    try {
      const result = await this.mailerService.sendMail({
        to: envs.MYEMAIL,
        subject: `Has recibido un mail de ${contactMail.name}`,
        template: 'test',
        context: {
          name: contactMail.name,
          email: contactMail.email,
          message: contactMail.message,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  async createMailContact2(contactMail: ContactMailPortafolio) {
    try {
      const result = await this.mailerService.sendMail({
        to: envs.MYEMAIL,
        subject: contactMail.subject,
        template: 'test',
        context: {
          name: contactMail.name,
          email: contactMail.email,
          message: contactMail.message,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async createMailPayment(order: OrderMail) {
    const orderContext = {
      orderId: order.order.id,
      customerName: order.order.user.name,
      items: order.order.products.map((item) => ({
        image: item.image[0],
        name: item.name,
        description: this.truncateDescription(item.description, 6),
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.order.price,
    };
    try {
      await this.mailerService.sendMail({
        to: order.order.user.email,
        subject: 'Gracias por tu compra, ' + order.order.user.name,
        template: 'payment',
        context: orderContext,
        attachments: [
          {
            filename: 'logo.png',
            path: envs.LOGO,
            cid: 'logo',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }
  truncateDescription(description: string, wordLimit: number): string {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  async createMailAppointment(newAppointment: CreateAppointment) {
    try {
      await this.mailerService.sendMail({
        to: newAppointment.user.email,
        subject: 'Cita agendada',
        template: 'newAppointment',
        context: {
          name: newAppointment.user.name,
          date: newAppointment.appointment.date,
          time: newAppointment.appointment.time,
          description: newAppointment.appointment.description,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: envs.LOGO,
            cid: 'logo',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createMailAppointmentChange(appointment: ChangeAppointment) {
    try {
      await this.mailerService.sendMail({
        to: appointment.appointment.user.email,
        subject: 'El turno fue cancelado',
        template: 'appointmentChange',
        context: {
          name: appointment.appointment.user.name,
          date: appointment.appointment.date,
          time: appointment.appointment.time,
          description: appointment.appointment.description,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: envs.LOGO,
            cid: 'logo',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
