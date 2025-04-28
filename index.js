const express = require('express');
const app = express();
const PORT = 3001;

const phonebook = require('./phonebook.js');

app.get('/', (req, res) => {
    res.send('<h1>This is a phonebook api!</h1>');
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook);
})

app.get('/info', (req, res) => {
    const date = new Date().toString();
    res.send(`Phonebook has info for ${phonebook.length} people - ${date}`);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = phonebook.find(person => person.id === id)
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})