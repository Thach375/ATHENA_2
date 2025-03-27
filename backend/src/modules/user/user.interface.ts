export interface UserModel {
  _id: string;
  fullname: string;
  phone?: string;
  email: string;
  password: string;
  dateOfBith?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  status?: number;
}
