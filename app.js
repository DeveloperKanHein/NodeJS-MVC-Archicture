require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', false);
mongoose.connect(
  process.env.DB_LOCAL_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const app = express();

const publicApiRoutes = require("./routes/public_api_routes");
const apiRoutes = require("./routes/api_routes");
const Middleware = require("./middleware/middleware");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api-v1/public/", publicApiRoutes);
app.use("/api-v1/", Middleware.authUser, apiRoutes);

const PORT = process.env.SERVER_PORT || 3000;

app.get("/", (req, res) => { res.send("<h1>NodeJS MVC Example</h1><p>- by Kan Hein</i></p>"); });

app.listen(PORT, (req, res) => { console.log("Server started at port: " + PORT); });
