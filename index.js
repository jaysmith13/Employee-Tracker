const mysql = require('mysql');
const inquirer = require('inquirer');
const { createConnection } = require('net');
require('console.table');

// Intial questions and prompts

const promptMessages = {
    viewAllEmployees: "View All Employees",
    ViewByDepartment:"View All Employess by Department",
    ViewByManager:"View all Employees By Manager",
    addEmployee: "Add an Employee",
    removeEmployee:"Remove Employee", 
    updateRole:"Update Employee Role",
    updateEmployeeManager:"update Employee Manager",
    exit: "Exit"
};
// Connections
createConnection.connect(err => {
    if (err) throw err;
    prompt();
});

const connection = mysql.createConnection({
    host:'localhost',

    user:'root',
    port:'3306',
    password:'',
    database:'employees'
});