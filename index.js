const app = require('./app');

const { PORT } = process.env;
const port = process.env.PORT || PORT;

app.listen(PORT, () => {
    console.log(`Listening on port ${port}`);
});