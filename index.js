const express = require('express');
const app = express();
const PORT = 3001;

const phonebook = require('./phonebook.js');

app.get('/', (req, res) => {
    res.send('<h1>This is a phonebook api!</h1>');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})