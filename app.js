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
const checkAuthStatusMiddleware = require('./middleware/check-auth');
const protectRoutesMiddleware = require('./middleware/protect-routes');
const cartMiddleware = require('./middleware/cart');
const baseRoutes  = require('./routes/base.routes');
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require('./routes/products.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use('/products/assets', express.static("product-data"));
app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(cartMiddleware);

app.use(addScrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(protectRoutesMiddleware);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

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
