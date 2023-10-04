const DOMAIN = "";
const PORT = 3000;

const path = require("path");

const express = require("express");
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require("./data/database");
const addScrfTokenMiddleware = require('./middleware/csrf-token');
const errorHandlerMiddleware = require('./middleware/error-handler');
const baseRoutes  = require('./routes/base.routes');
const authRoutes = require("./routes/auth.routes");
const producsRoutes = require('./routes/products.routes');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(addScrfTokenMiddleware);
app.use(errorHandlerMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(producsRoutes);

db.connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("This app is running in http://localhost:3000");
    });
  })
  .catch((error) => {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
