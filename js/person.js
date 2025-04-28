const createId = require('./createID.js');

class Person {
    constructor(name, number) {
        this.id = createId();
        this.name = name;
        this.number = number;
    }
}

module.exports = Person;