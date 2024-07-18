import { __dirname, __filename } from './config/common.js';
import envConfig from "./config/env.config.js";
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import candidateRouter from './routes/api/candidates.js';
import jobRouter from './routes/api/jobs.js';
const app = express();
const port = envConfig.docker_node_port;

// Handlebars Middleware
app.set("view engine", 'handlebars');
app.engine('handlebars', handlebars.engine());

// REQUEST Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", async (req, res) => {
  console.log("Get home route...");

  // TODO - check if web or api
  // if web then:
  res.render('index.handlebars', {
    title: 'Web Page Title',
    text: 'Web Page Text'
  });
  // else:
  // res.status(200).json({ text: "CV Generator API - Home" });
})

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/candidates', candidateRouter);
app.use('/api/jobs', jobRouter);

app.listen(port, function () {
  console.log(`Starter app listening on port ${port}!`)
})