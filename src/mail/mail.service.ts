import { Injectable } from '@nestjs/common';
import {
  ChangeAppointment,
  ContactMailPortafolio,
  CreateAppointment,
  CreateMailWelcomeDto,
  OrderMail,
} from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async createMailWelcome(createMailDto: CreateMailWelcomeDto) {
    console.log(createMailDto);
    try {
      await this.mailerService.sendMail({
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
            path: 'https://i.ibb.co/stDtVXC/Logo-Emax-Peluqueria-Actualizado.png',
            cid: 'logo',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createMailContact(contactMail: ContactMailPortafolio) {
    try {
      await this.mailerService.sendMail({
        to: 'ema.cuello1010@gmail.com',
        subject: 'Has recibido un mail de' + contactMail.name,
        template: 'test',
        context: {
          name: contactMail.name,
          email: contactMail.email,
          message: contactMail.message,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createMailPayment(order: OrderMail) {
    const orderContext = {
      orderId: order.id,
      customerName: order.user.name,
      items: order.products.map((item) => ({
        image: item.image[0],
        name: item.name,
        description: this.truncateDescription(item.description, 6),
        quantity: item.quantity,
        price: item.unitPrice,
      })),
      total: order.price,
    };
    console.log(orderContext);

    try {
      await this.mailerService.sendMail({
        to: order.user[0].email,
        subject: 'Gracias por tu compra, ' + order.user.name,
        template: 'payment',
        context: orderContext,
        attachments: [
          {
            filename: 'logo.png',
            path: 'https://i.ibb.co/stDtVXC/Logo-Emax-Peluqueria-Actualizado.png',
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
    console.log(newAppointment);
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
            path: 'https://i.ibb.co/stDtVXC/Logo-Emax-Peluqueria-Actualizado.png',
            cid: 'logo',
          },
        ],
      });
    } catch (error) {}
  }

  createMailAppointmentChange(appointment: ChangeAppointment) {
    console.log(appointment);
    try {
      this.mailerService.sendMail({
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
            path: 'https://i.ibb.co/stDtVXC/Logo-Emax-Peluqueria-Actualizado.png',
            cid: 'logo',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }
}