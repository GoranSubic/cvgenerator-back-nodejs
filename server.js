const envConfig = require("./config/env.config.js");
const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const port = envConfig.docker_node_port;
const path = require('path');
const candidateRouter = require('./routes/api/candidates.js');

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

app.listen(port, function () {
  console.log(`Starter app listening on port ${port}!`)
})