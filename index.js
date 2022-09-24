const inquirer = require('inquirer');
const fs = require('fs');
let mainBody = '';

const Manager = require('./lib/Manager');
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
    name: "github"
}]

const InternArray = [{
    type: "input",
    message: "what is your school name?",
    name: "school"
}]
function questions(){

    const managerQuestions = ManagerArray.concat(promptArray);

inquirer
    .prompt(managerQuestions)
    .then((response) => {
        const GenManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        const createCard = generateManagerHTML(GenManager);
        mainBody += createCard;

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
            generateHTMLFile();
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
        if(response.add === "yes"){
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
    const internQuestions = InternArray.concat(promptArray);

    inquirer
        .prompt(internQuestions)
        .then((response) => {
            const GenIntern = new Intern(response.name, response.id, response.email, response.school);
            const createCard = generateInternHTML(GenIntern);
            mainBody += createCard;
    
            nextMember();
        })
    }

function createEngineerCard() {
    const engineerQuestions = EngineerArray.concat(promptArray);

    inquirer
        .prompt(engineerQuestions)
        .then((response) => {
            const GenEngineer = new Engineer(response.name, response.id, response.email, response.github);
            const createCard = generateEngineerHTML(GenEngineer);
            mainBody += createCard;

            nextMember();
        })
}

function generateHTMLFile(){
    const writeHTMLFile = `
    <!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="/TeamGenerator/sc/style.css">
    <title>Best Team Ever</title>
  </head>
  <body>
   <header><h1>UCLA Team</h1></header>
    <div class="card-group">
   ${mainBody}
   </div>
    </body>
    
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
  
</html>`
// center the body on bootstrap

fs.writeFile("index.html", writeHTMLFile, (err) =>
err? console.log(err) : console.log("Success!!"))
}


function generateManagerHTML(manager) {
    return `
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${manager.name}</h5>
    <p class="card-text">Office Number:${manager.officeNumber} <br> Manager ID:${manager.id} <br> Manager Email:${manager.email} </p>
  </div>
</div>

    `
}
function generateEngineerHTML(engineer) {
    return `
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${engineer.name}</h5>
    <p class="card-text">Engineer ID:${engineer.id} <br> Engineer Email:${engineer.email} <br> Engineer Github: http://github.com/${engineer.github}<p>
  </div>
</div>

    `
}
    function generateInternHTML(intern) {
        return `
        <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${intern.name}</h5>
        <p class="card-text">Intern ID:${intern.id} <br> Intern Email:${intern.email} <br> Intern School:${intern.school}</p>
      </div>
    </div>
    
        `
    }
questions();