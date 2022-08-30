const mysql = require('mysql');
const inquirer = require('inquirer');
const { createConnection } = require('net');
const { connect } = require('http2');
const { from } = require('rxjs');
const { join } = require('path');
const { type } = require('os');
require('console.table');

// Intial questions and prompts

const promptMessages = {
    viewAllEmployees: "View All Employees",
    ViewByDepartments:"View All Employess by Department",
    ViewByManagers:"View all Employees By Manager",
    removeEmployee:"Remove Employee", 
    updateRole:"Update Employee Role",
    addNewEmployee: "Add Employee",
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
        type:'options',
        message:'Which option would you like to use?',
        choices:[
            promptMessages.viewAllEmployees,
            promptMessages.ViewByDepartments,
            promptMessages.ViewByManagers,
            promptMessages.removeEmployee, 
            promptMessages.updateRole,
            promptMessages.addNewEmployee,
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
        case promptMessages.ViewByDepartments:
             ViewByDepartment();
                break;
        case promptMessages.addNewEmployee:
            addEmployee();
                break;
        case promptMessages.ViewByManagers:
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
function viewAllDepartments() {
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
const addEmployee = () => {
    return inquirer.prompt(askName());
 
    function viewByManager() {
        const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
        FROM employee
        LEFT JOIN employee manager on manager.id = employee.manager_id
        INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY manager;`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('VIEW EMPLOYEE BY MANAGER');
            prompt();
        });
    }
    function viewAllRoles() {
        const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
        FROM employee
        LEFT JOIN role ON (role.id = employee.role_id)
        LEFT JOIN department ON (department.id = role.department_id)
        ORDER BY role.title;`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('VIEW EMPLOYEE BY ROLE');
            prompt();
        });
    
    }
    async function addEmployee() {
        const addname = await inquirer.prompt(askName());
        connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
            if (err) throw err;
            const { role } = await inquirer.prompt([
                {
                    name: 'role',
                    type: 'list',
                    choices: () => res.map(res => res.title),
                    message: 'What is the employee role?: '
                }
            ]);
            let roleId;
            for (const row of res) {
                if (row.title === role) {
                    roleId = row.id;
                    continue;
                }
            }
            connection.query('SELECT * FROM employee', async (err, res) => {
                if (err) throw err;
                let choices = res.map(res => `${res.first_name} ${res.last_name}`);
                choices.push('none');
                let { manager } = await inquirer.prompt([
                    {
                        name: 'manager',
                        type: 'list',
                        choices: choices,
                        message: 'Choose the employee Manager: '
                    }
                ]);
                let managerId;
                let managerName;
                if (manager === 'none') {
                    managerId = null;
                } else {
                    for (const data of res) {
                        data.fullName = `${data.first_name} ${data.last_name}`;
                        if (data.fullName === manager) {
                            managerId = data.id;
                            managerName = data.fullName;
                            console.log(managerId);
                            console.log(managerName);
                            continue;
                        }
                    }
                }
                console.log('Employee has been added. Please view all employee to verify...');
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: addname.first,
                        last_name: addname.last,
                        role_id: roleId,
                        manager_id: parseInt(managerId)
                    },
                    (err, res) => {
                        if (err) throw err;
                        prompt();
    
                    }
                );
            });
        });
    
    }
    function remove(input) {
        const promptQ = {
            yes: "yes",
            no: "no I don't (view all employees on the main option)"
        };
        inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "In order to proceed an employee, an ID must be entered. View all employees to get" +
                    " the employee ID. Do you know the employee ID?",
                choices: [promptQ.yes, promptQ.no]
            }
        ]).then(answer => {
            if (input === 'delete' && answer.action === "yes") removeEmployee();
            else if (input === 'role' && answer.action === "yes") updateRole();
            else viewAllEmployees();
    
    
    
        });
    };
    
    async function removeEmployee() {
    
        const answer = await inquirer.prompt([
            {
                name: "first",
                type: "input",
                message: "Enter the employee ID you want to remove:  "
            }
        ]);
    
        connection.query('DELETE FROM employee WHERE ?',
            {
                id: answer.first
            },
            function (err) {
                if (err) throw err;
            }
        )
        console.log('Employee has been removed on the system!');
        prompt();
    
    };
    async function updateRole() {
        const employeeId = await inquirer.prompt(askId());
    
        connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
            if (err) throw err;
            const { role } = await inquirer.prompt([
                {
                    name: 'role',
                    type: 'list',
                    choices: () => res.map(res => res.title),
                    message: 'What is the new employee role?: '
                }
            ]);
            let roleId;
            for (const row of res) {
                if (row.title === role) {
                    roleId = row.id;
                    continue;
                }
            }
            connection.query(`UPDATE employee 
            SET role_id = ${roleId}
            WHERE employee.id = ${employeeId.name}`, async (err, res) => {
                if (err) throw err;
                console.log('Role has been updated..')
                prompt();
            });
        });
    }

// functions selections
function askName(){
    return ([
        {
            name: "first",
            type: "input",
            message: "Please input the employee's first name."
        },
        {
            name: "last",
            type: "input",
            message: "Please input the employee's last name."
        }
    ])
};
function askId(){
    return ([{
        name: "name",
        type: "input",
        message: "Please input the employee's ID"
    }]);
};
}