export interface AdminModel {
  _id?: string;
  fullname: string;
  email: string;
  password: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
