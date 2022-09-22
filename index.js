const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/Manager');
const Employee = require('./lib/Employee');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');

const promptArray = [ {
    type: "input",
    message: "What is your name?",
    name: "name",
}, 
{
    type: "input",
    message: "what is your ID?",
    name: "id"
},
{
    type: "input",
    message: "whats is your email?",
    name: "email"
},
]

const ManagerArray = [{
    type: "input",
    message: "whats your office number?",
    name: "officeNumber"
}]

const EngineerArray = [{
    type: "input",
    message: "whats your github username?",
    name: "GBuserName"
}]

const InternArray = [{
    type: "input",
    message: "what is your school name?",
    name: "SchoolInfo"
}]
function questions(){

    const managerQuestions = ManagerArray.concat(managerQuestions);

inquirer
    .prompt(managerQuestions)
    .then((response) => {
        const Manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        const createCard = cardTemplates.generateManagerCard(Manager);
        mainBody += generateCard;

        nextMember();
    })
}

function nextMember(){
    inquirer
    .prompt({
        type: "list",
        message: "would you like to add another person?",
        name: "addition",
        choices: ["yes", "no"],
    })
    .then((response) => {
        if(response.addition === "yes"){
            askEngineer();
        } else {
            writeHTMLFile();
        }
    });
}

function askEngineer(){
    inquirer
    .prompt({
        type: "list",
        message: "Are you a engineer?",
        name: "add",
        choices: ["yes", "no"],
    })
    .then((response) => {
        if(response.addition === "yes"){
            createEngineerCard();
        } else {
            askIntern();
        }
    });
}

function askIntern(){
    inquirer
    .prompt({
        type: "list",
        message: "Are you a intern?",
        name: "internalcard",
        choices: ["yes", "no"],
    })
    .then((response) => {
        if(response.internalcard === "yes"){
            createEngineerCard();
        }
    });
}
questions();
// run inquirer to create position through questions, 
// with the answers create template for positions, 
//create the html/css through fs. 
// run another function to create the rest of the positions. 
