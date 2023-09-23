const DOMAIN = "";
const PORT = 3000;

const path = require('path');

const express = require('express');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(authRoutes);

app.listen(PORT, () => {
    console.log('This app is running in http://localhost:3000/signup');
})