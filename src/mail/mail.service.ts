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
import axios from 'axios';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async verifyConfiguration() {
    console.log('USER:', envs.USER);
    console.log('CLIENT_ID:', envs.CLIENT_ID);
    console.log('CLIENT_SECRET:', envs.CLIENT_SECRET);
    console.log('REFRESH_TOKEN:', envs.REFRESH_TOKEN);

    try {
      const response = await axios.get(envs.API_OAUTH, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${envs.REFRESH_TOKEN}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch access token');
      }

      console.log('Access Token:', response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }
  async createMailWelcome(createMailDto: CreateMailWelcomeDto) {
    try {
      const accessToken = await this.verifyConfiguration();
      console.log('Access Token: 2', accessToken);

      // Intentar enviar un correo de prueba
      const testMail = await this.mailerService.sendMail({
        to: envs.USER,
        subject: 'Prueba de Configuración',
        text: 'Este es un correo de prueba para verificar la configuración del servicio de correo.',
      });

      console.log('Correo de prueba enviado:', testMail);
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
      await this.mailerService.sendMail({
        to: envs.MYEMAIL,
        subject: `Has recibido un mail de ${contactMail.name}`,
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
    try {
      await this.mailerService.sendMail({
        to: order.user.email,
        subject: 'Gracias por tu compra, ' + order.user.name,
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
    } catch (error) {}
  }

  createMailAppointmentChange(appointment: ChangeAppointment) {
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
