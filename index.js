const inquire = require('require');
const path = require('path');
const express = require('express');

const PORT = process.env.port || 3001;

const promptArray = [ {
    type: "input",
    message: "What is your name?",
    name: "newEmployee",
}, 
{
    type: "input",
    message: "what is your ID?",
    name: "newEmployee"
},
{
    type: "input",
    message: "whats is your email?",
    name: "newEmployee"
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

