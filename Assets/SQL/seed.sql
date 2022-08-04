SELECT role.id, role.title, role.salary FROM role ORDER BY role.id;
SELECT role.id, role.title FROM role ORDER BY role.id;
SELECT * FROM employee;

SELECT first_name, last_name, role_id FROM employee WHERE employee.id = 4;

SELECT department.id, department.name FROM department ORDER BY department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager on manager.id = employee.manager_id
INNER JOIN role on (role.id = employee.role_id)
INNER JOIN department on (department.id = role.department_id)
ORDER BY employee.id;