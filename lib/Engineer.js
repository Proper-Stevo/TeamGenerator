const Employee = require(`./Employee`);

class Engineer extends Employee {
    constructor(name, email, id, github) {
    super(name, id, email, github);
    this.github = github;
}
getRole () {
    return "Engineer";
}

getGithub() {
    return this.github;
}
}
module.exports = Engineer;