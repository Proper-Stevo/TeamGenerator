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
            const createCard = generateInternHTML(GenIntern);
            mainBody += createCard;
    
            nextMember();
        })
    }

function createEngineerCard() {
    const engineerQuestions = EngineerArray.concat(engineerQuestions);

    inquirer
        .prompt(engineerQuestions)
        .then((response) => {
            const GenEngineer = new Engineer(response.name, response.id, response.email, response.GBuserInfo);
            const createCard = generateEngineerHTML(GenEngineer);
            mainBody += createCard;
        })
}

function generateHTMLFile(){
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

    <${mainBody}>
</body>
</html>`
// center the body on bootstrap

fs.writeFile("index.html", writeHTMLFile, (err) =>
err? console.log(err) : console.log("Success!!"))
}
//notes from mini project on Node and OOP
// card.html for everyone. 
// create seperate function that returns html card strings
function generateManagerHTML(manager) {
    return `
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${manager.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

    `
}
function generateEngineerHTML(engineer) {
    return `
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${engineer.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

    `
}
    function generateInternHTML(intern) {
        return `
        <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${intern.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
    
        `
    }
questions();