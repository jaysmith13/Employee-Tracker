SELECT role.id, role.title, role.salary FROM role ORDER BY role.id;
SELECT role.id, role.title FROM role ORDER BY role.id;
SELECT first_name, last_name, role_id FROM employee WHERE employee.id = 4;
SELECT * FROM employee;

SELECT department.id, department.name FROM department ORDER BY department.id;

SELECT department.name as department, role.title, employee.id, employee.first_name, employee.last_name
FROM employee
LEFT JOIN role ON(role.id = employee.role_id)
LEFT JOIN department on (department.id = role.department_id)
ORDER BY department.name;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS departments, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager on manager.id = employee.manager_id
INNER JOIN role on (role.id = employee.role_id)
INNER JOIN department on (department.id = role.departments_id)
ORDER BY employee.id;

SELECT CONCAT(manager.first_name, '', manager.last_name) as manager, department.name as departments, employee.first_name, employee.last_name, role.title
FROM employee
LEFT JOIN employee manager on manager.id = employee.manager_id
INNER JOIN role on (role.id = employee.role_id & employee.manager_id ='null')
INNER JOIN departments on (departments.id = role.departments_id)
ORDER BY manager;

SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name as department
FROM employee
LEFT JOIN role on (role.id = employee.role_id)
LEFT JOIN departments on (departments.id = role.departments_id)
ORDER BY role.title;

use employees;
INSERT INTO department
(name)
values
('Sales'),
('Engineering'),
('Finance'),
('Legal');



INSERT INTO role
(title, salary, department_id)
Values
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 150000, 4);


Insert Into employee
(first_name, last_name, role_id, manager_id)

Values
('Mike', 'Chan', 1),
('Ashley', 'Rodriguez', 2, null),
('Kevin', 'Tupik', 2),
('Kunal', 'Singh', 3, null),
('Malia', 'Brown', 3),
('Sarah','Lourd', 4, null),
('Tom', 'Allen',4);