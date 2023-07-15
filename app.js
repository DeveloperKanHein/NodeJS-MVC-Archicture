require('dotenv').config();
const express = require('express');
const session = require('express-session')
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

//Middlewares
const Middleware = require("./middleware/middleware");
const WebAuthMiddleware = require("./middleware/web_auth_middleware");

//Routes
const publicApiRoutes = require("./routes/public_api_routes");
const apiRoutes = require("./routes/api_routes");
const webRoutes = require("./routes/web_routes");

//Config MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//Instantiate App Object
const app = express();

//Set Dependency
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'AZLct345@#$34HL',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use("/api-v1/public/", publicApiRoutes);
app.use("/api-v1/", apiRoutes);
app.use("/admin/", webRoutes);

const PORT = process.env.SERVER_PORT || 3000;

app.get("/", (req, res) => { res.send("<h1>Nihongo</h1><p>- developed by Kan Hein</i></p>"); });
app.listen(PORT, (req, res) => { console.log("Server started at port: " + PORT); });