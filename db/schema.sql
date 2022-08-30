Drop Database IF EXISTS EmployeeTracker;
Create Database EmployeeTracker;

USE EmployeeTracker;

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
