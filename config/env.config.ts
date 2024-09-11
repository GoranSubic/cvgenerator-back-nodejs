import dotenv from 'dotenv';
dotenv.config();
const env = process.env;

const envConfig = {
  HOST: env.DB_HOST,
  USER: env.DB_USERNAME,
  PASSWORD: env.DB_PASSWORD,
  DB: env.DB_DATABASE,
  port: env.FORWARD_DB_PORT,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  local_node_port: env.LOCAL_NODE_PORT,
  docker_node_port: env.DOCKER_NODE_PORT
};

export default envConfig;