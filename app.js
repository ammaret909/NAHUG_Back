const express = require('express');

const userRoutes = require('./routes/users');
const foodsRoutes = require('./routes/foods');
// const vaccineRoutes = require('./routes/vaccines');
const cors = require('cors');

const app = express();



// // Setting up middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setting up routes
app.use('/users', userRoutes);
app.use('/foods', foodsRoutes);
// app.use('/vaccines', vaccineRoutes);

// Creating a server
app.listen(8080, () => {
    console.log('Listening on port 8080');
});