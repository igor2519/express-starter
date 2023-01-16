import { UserModel } from '@database';

import type { IUserCreationAttributes, IUserAttributes } from '@database';
import type { WhereOptions } from 'sequelize';

const create = (attributes: IUserCreationAttributes) => UserModel.create(attributes);

const updateByFilter = (filters: WhereOptions<IUserAttributes>, data: Partial<IUserAttributes>) =>
  UserModel.update(data, {
    where: filters,
    returning: true,
  });

const getOneByFilter = (filters: WhereOptions<IUserAttributes>) => UserModel.findOne({ where: filters });

const getManyByFilter = (filters: WhereOptions<IUserAttributes>, select?: string[]) =>
  UserModel.findAll({ where: filters, ...(select ? { attributes: select } : {}) });

const deleteByFilter = (filters: WhereOptions<IUserAttributes>) =>
  UserModel.destroy({
    where: filters,
  });

const getCount = (filters: WhereOptions<IUserAttributes>) => UserModel.count({ where: filters });

const getList = (filter: WhereOptions<IUserAttributes>, offset?: number, limit?: number, select?: string[]) =>
  UserModel.findAll({
    where: filter,
    ...(select ? { attributes: select } : {}),
    ...(Number.isInteger(offset) && Number.isInteger(limit) ? { offset, limit } : {}),
  });

const userCompanyPermissionRepository = {
  deleteByFilter,
  getOneByFilter,
  getManyByFilter,
  updateByFilter,
  getCount,
  create,
  getList,
};

export default userCompanyPermissionRepository;
