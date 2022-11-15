const app = require('./app');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});