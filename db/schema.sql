Drop Database IF EXISTS employees;
Create Database employees;

USE employees;

Create TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER  NOT NULL,
Index role_ind (role_id),
Constraint fk_role 
foreign key (role_id) 
references roles(id) 
on delete CASCADE,
manager_id INTEGER ,

INDEX man_ind (manager_id),
Constraint fk_manager 
FOREIGN KEY (manager_id) 
REFERENCES employee(id)
 ON DELETE SET NULL);

CREATE TABLE Roles (
id INTEGER AUTO_INCREMENT primary key,
title VARCHAR(30) not null,
salary DECIMAL not null,
department_id INT not null,
INDEX dep_ind (department_id),
CONSTRAINT fk_department 
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
use employees;
Insert Into department
(name)
values
('Sales'),
('Engineering'),
('Finance'),
('Legal');



Insert Into role
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