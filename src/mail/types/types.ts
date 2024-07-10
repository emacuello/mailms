export interface Products {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  quantity: number;
  total: number;
  stock: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  nDni: number;
  role: string;
  socialUser: boolean;
  appointment?: any[];
}

export interface Appointment {
  id: number;
  date: string;
  time: string;
  description: string;
  status: string;
  user?: User;
}
