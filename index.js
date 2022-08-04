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

function prompt(){
    inquirer
    .prompt({
        name:'action',
        type:'list',
        message:'Which option would you like to do?',
        choices:[
            promptMessages.viewAllEmployees,
            promptMessages.ViewByDepartment,
            promptMessages.ViewByManager,
            promptMessages.addEmployee,
            promptMessages.removeEmployee, 
            promptMessages.updateRole,
            promptMessages.updateEmployeeManager,
            promptMessages.exit
        ]
    })
    // Prompt responses


}

// functions selections




















































































































































































































































// function for Name
function askName() {
    return ([{
        name: "first",
        type: "input",
        message: "Please enter the first name:"
    },
    {
        name:"last",
        type:"input",
        message:"Enter the last name:"
    }
]);
}