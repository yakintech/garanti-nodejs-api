const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});