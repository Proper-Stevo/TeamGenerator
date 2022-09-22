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
        const GenManager = new Manager(response.name, response.id, response.email, response.officeNumber);
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
            createInternCard();
        }
    });
}
function createInternCard() {
    const internQuestions = InternArray.concat(internQuestions);

    inquirer
        .prompt(internQuestions)
        .then((response) => {
            const GenIntern = new Intern(response.name, response.id, response.email, response.SchoolInfo);
            const createCard = cardTemplates.createInternCard(Intern);
            mainBody += generateCard;
    
            nextMember();
        })
    }

function createEngineerCard() {
    const engineerQuestions = EngineerArray.concat(engineerQuestions);

    inquirer
        .prompt(engineerQuestions)
        .then((response) => {
            const GenEngineer = new Engineer(response.name, response.id, response.email, response.GBuserInfo);
            const createCard = cardTemplates.createEngineerCard(Engineer);
        })
}
function createHTMLFile(){
    const writeHTMLFile = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <title>Best Team Ever</title>

</head>
<body>
    
</body>
</html>`

fs.writeFile("index.html", writeHTMLFile, (err) =>
err? console.log(err) : console.log("Success!!"))
}
questions();
//notes from mini project on Node and OOP