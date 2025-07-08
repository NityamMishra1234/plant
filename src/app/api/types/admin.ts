export interface Admin {
  _id?: string;
  email: string;
  password: string;
  role: 'admin';
  createdAt: Date;
}