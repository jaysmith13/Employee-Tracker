const mysql = require('mysql');
const inquirer = require('inquirer');
const { createConnection } = require('net');
const { connect } = require('http2');
const { from } = require('rxjs');
const { join } = require('path');
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

function prompt(){
    inquirer
    .prompt({
        name:'action',
        type:'list',
        message:'Which action would you like to do?',
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
.then(answer => {
    console.log('answer', answer);
    switch (answer.action){
        case promptMessages.viewAllEmployees:
            viewAllEmployees();
                break;
        case promptMessages.ViewByDepartment:
             ViewByDepartment();
                break;
        case promptMessages.addEmployee:
            addEmployee();
                break;
        case promptMessages.ViewByManager:
            ViewByManager();
                break;
        case promptMessages.removeEmployee:
            remove('delete');
        case promptMessages.viewRoles:
            viewRoles();
            break;
        case promptMessages.updateRole:
            updateRole()
            break;
        case promptMessages.exit:
            createConnection.end();
            break;

    }
})

}
function viewAllDepartment() {
    const query = `select department.name, role.title, employee.id, employee.first_name, employee.last_name
    from employee 
    left join role on (role.id = employee.role_id)
    left join department on (department.id = role.department_id)
    Order by department.name;`;
    db.query(query,(err,res) => {
        if(err) throw err;
    }
    ,console.table(res));
    prompt();
};
function viewAllEmployees() {
    const query = `select employee.id, role.title, employee.first_name, employee.last_name, department.name, 
    from employee 
    left join employee manager on (manager.id = employee.manager_id)
    Inner join department on (department.id = role.department_id)
    Inner join role on (role.id=employee.role_id)
    Order by employee.name;`;
    db.query(query,(err,res) => {
        if(err) throw err;
    }
    ,console.table(res));
    prompt();
};



// functions selections
function askName(){
    return ([
        {
            name: "first",
            type: "input",
            message: "Input first name"
        },
        {
            name: "last",
            type: "input",
            message: "Input last name"
        }
    ])
};
function askId(){
    return ([{
        name: "name",
        type: "input",
        message: "Input the employee ID"
    }]);
};
function remove(input){
    const prompt;
}

















































































































































































































































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