Drop Database IF EXISTS employees;
Create Database employees;

Use employees;

Create table department (
id INT UNSIGNED auto_increment primary key,
name VARCAR(30) UNIQUE NOT NULL);

//Role
create table role (
id INT UNSIGNED auto_increment primary key,
title VARCAR(30) unique not null,
salary DECIMAL unsigned not null,
department_id INT unsigned not null,
INDEX dep_ind (department_id),
Constraint fk_department foreign key (department_id) references department(id) on delete CASCADE
);


Create table employee (
id INT unsigned auto_increment primary key,
first_name VARCAR(30) not null,
last_name VARCAR(30) not null,
role_id INT unsigned not null,
Index role_ind (role_id),
Constraint fk_role foreign key (role_id) references role(id) on delete CASCADE,
manager_id INT unsigned,
INDEX man_ind (manager_id),
Constraint fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) on delete set null
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