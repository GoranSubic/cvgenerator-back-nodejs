import dotenv, { config } from 'dotenv';
dotenv.config();
const env = process.env;

enum NodeEnv {
  development = 'development',
  test = 'test',
  production = 'production',
};

const x = env.NODE_ENV;
const node_env = NodeEnv[x as keyof typeof NodeEnv] ?? 'development';

const config_env = {
  "development": {
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_DATABASE,
    "host": env.DB_HOST,
    "dialect": "postgres",
    "port": env.FORWARD_DB_PORT,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    },
    "local_node_port": env.LOCAL_NODE_PORT,
    "docker_node_port": env.DOCKER_NODE_PORT,
    "access_token_secret": env.ACCESS_TOKEN_SECRET,
    "access_token_lifetime": env.ACCESS_TOKEN_LIFETIME,
    "refresh_token_secret": env.REFRESH_TOKEN_SECRET,
    "refresh_token_lifetime": env.REFRESH_TOKEN_LIFETIME
  },
  "test": {
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_DATABASE,
    "host": env.DB_HOST,
    "dialect": "postgres",
    "port": env.FORWARD_DB_PORT,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    },
    "local_node_port": env.LOCAL_NODE_PORT,
    "docker_node_port": env.DOCKER_NODE_PORT,
    "access_token_secret": env.ACCESS_TOKEN_SECRET,
    "access_token_lifetime": env.ACCESS_TOKEN_LIFETIME,
    "refresh_token_secret": env.REFRESH_TOKEN_SECRET,
    "refresh_token_lifetime": env.REFRESH_TOKEN_LIFETIME
  },
  "production": {
    "username": env.PROD_DB_USERNAME,
    "password": env.PROD_DB_PASSWORD,
    "database": env.PROD_DB_DATABASE,
    "host": env.PROD_DB_HOST,
    "dialect": "postgres",
    "port": env.PROD_FORWARD_DB_PORT,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    },
    "local_node_port": env.PROD_LOCAL_NODE_PORT,
    "docker_node_port": env.PROD_DOCKER_NODE_PORT,
    "access_token_secret": env.ACCESS_TOKEN_SECRET,
    "access_token_lifetime": env.ACCESS_TOKEN_LIFETIME,
    "refresh_token_secret": env.REFRESH_TOKEN_SECRET,
    "refresh_token_lifetime": env.REFRESH_TOKEN_LIFETIME
  }
}

export {config_env, node_env};