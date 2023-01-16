import type { UserRole } from 'enums';
import type { Model, Optional } from 'sequelize';

export interface IPublicUserAttributes {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserAttributes extends IPublicUserAttributes {
  password: string;
}

export type IUserCreationAttributes = Optional<IUserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export type IUser = Model<IUserAttributes, IUserCreationAttributes> & IUserAttributes;

export type IUserPopulated = IUser & {};
