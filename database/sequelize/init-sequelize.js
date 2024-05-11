const envConfig = require("../../config/env.config.js");
const Sequelize = require("sequelize");
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

module.exports = sequelize;