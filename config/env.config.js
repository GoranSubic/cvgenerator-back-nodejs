require("dotenv").config();
const env = process.env;

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE,
    port: process.env.FORWARD_DB_PORT,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    local_node_port: process.env.LOCAL_NODE_PORT,
    docker_node_port: process.env.DOCKER_NODE_PORT
  };