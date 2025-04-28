const phonebook = require('../phonebook.js');

const createID = () => {
    const newID = Math.max(...phonebook.map(person => Number(person.id))) + 1;
    return newID.toString();
}

module.exports = createID;