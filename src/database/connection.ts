import { sequelizeConfig } from '@constants';
import csl from 'cls-hooked';
import { Sequelize, Transaction } from 'sequelize';
import { envUtil } from 'utils';

import type { ISequelize } from '@types';
const env = envUtil.getEnv();

const namespace = csl.createNamespace(sequelizeConfig.namespace);

const sequelize = new Sequelize({
  ...env.database,
  dialect: 'postgres',
  logging: false,
  //envUtil.isProdEnv() ? console.log : false,
  isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
});

sequelize.Sequelize.useCLS(namespace);

export default sequelize as ISequelize;
