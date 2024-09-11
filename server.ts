import { fileURLToPath } from 'url';

import envConfig from "./config/env.config";
import express from 'express';
import path from 'path';
import candidateRouter from './routes/api/candidates.js';
import jobRouter from './routes/api/jobs.js';
import bodyParser from 'body-parser';
import cors from 'cors';

import { loadModels } from './models/index.js';

// import { __dirname, __filename } from './config/common';
// import commonConfig from './config/common';
// const { __dirname } = commonConfig(import.meta.url);

// Utility to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = envConfig.docker_node_port;

var corsOptions = {
  origin: "http://localhost:8080/"
};
app.use (cors(corsOptions));

app.use (bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use (bodyParser.urlencoded({extended:true}));

// REQUEST Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", async (req, res) => {
  res.status(200).json({ text: "CV Generator API - Home" });
})

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/candidates', candidateRouter);
app.use('/api/jobs', jobRouter);

// Sync models and start server
const startServer = async () => {
  try {
    const db = await loadModels();

    if (db && db.default && db.default.sequelize) {
      await db.default.sequelize.sync({ force: true });
      app.listen(port, () => {
        console.log(`Starter app listening on port ${port}!`);
      });
    } else {
      throw new Error('Failed to load db or db.sequelize is undefined');
    }
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();