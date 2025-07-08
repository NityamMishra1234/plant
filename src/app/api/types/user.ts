export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  address: string;
  role: 'user';
  createdAt: Date;
}