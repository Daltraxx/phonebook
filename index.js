const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json()); // allows use of req.body in handling post requests

const morgan = require('morgan');
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const phonebook = require('./phonebook.js');
const Person = require('./js/person.js');

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

app.post('/api/persons', (req, res) => {
    const personData = req.body;
    const { name, number } = personData;
    if (!name || !number) {
        console.log('Missing fields');
        res.status(400).json({
            error: 'content missing'
        })
    } else if (phonebook.find(person => person.name === name)) {
        console.log('Person with that name already exists');
        res.status(400).json({
            error: 'Person with that name already exists'
        })
    } else {
        phonebook.push(new Person(name, number));
        console.log(phonebook);
        res.json(personData);
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    let personIndex;

    for (let i = 0; i < phonebook.length; i++) {
        if (phonebook[i].id === id) {
            personIndex = i;
            break;
        }
    }

    if (personIndex) {
        phonebook.splice(personIndex, 1);
        console.log(`Deletion of record with ID ${id} successful.`)
        console.log(phonebook);
        res.status(204).end();
    } else {
        console.log(`No person with ID ${id} found`);
        res.status(204).end();
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})