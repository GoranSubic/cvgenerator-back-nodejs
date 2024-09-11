import envConfig from "../../config/env.config";
import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(envConfig.DB, envConfig.USER, envConfig.PASSWORD, {
  host: envConfig.HOST,
  dialect: envConfig.dialect,
  port: envConfig.port,
  // operatorsAliases: false,

  pool: {
    max: envConfig.pool.max,
    min: envConfig.pool.min,
    acquire: envConfig.pool.acquire,
    idle: envConfig.pool.idle
  }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default sequelize;