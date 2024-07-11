import { Appointment, Products, User } from '../types/types';

export class CreateMailWelcomeDto {
  name: string;
  email: string;
}

export class ContactMailPortafolio {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export class CreatePayment {
  id: string;
}

export class OrderMail {
  order: {
    id: string;
    products: Products[];
    user: User;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export class CreateAppointment {
  user: User;
  appointment: Appointment;
}

export class ChangeAppointment {
  appointment: Appointment;
}
