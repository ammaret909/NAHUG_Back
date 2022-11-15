require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth');

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const catRoutes = require('./routes/cats');
// const userRoutes = require('./routes/users');
const foodsRoutes = require('./routes/foods');
// const vaccineRoutes = require('./routes/vaccines');

const app = express();

// // Setting up middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Setting up routes
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/cats', auth, catRoutes);
app.use('/foods', auth, foodsRoutes);
// app.use('/users', userRoutes);
// app.use('/foods', foodsRoutes);
// app.use('/vaccines', vaccineRoutes);

module.exports = app;