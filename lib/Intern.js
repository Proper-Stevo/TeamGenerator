const Employee = require(`./Employee`);

class Intern extends Employee {
    constructor(name, email, id, school) {
    super(name, id, email, school);
    this.school = school;
}
getRole () {
    return "Intern";
}

getSchool() {
    return this.school;
}
}

module.exports = Intern;