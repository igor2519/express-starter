import { DataTypes } from 'sequelize';

import sequelize from '../connection';

import type { IUser, IUserAttributes } from '@database';

const UserModel = sequelize.define<IUser, IUserAttributes, {}>(
  'User',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    fullName: {
      field: 'full_name',
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.NUMBER,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  },
  {
    tableName: 'users',
    timestamps: true,
  },
);

export default UserModel;
