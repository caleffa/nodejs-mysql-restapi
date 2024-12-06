CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    lastname VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);

DESCRIBE employee;


INSERT INTO employee (NAME,lastname,salary) VALUES 
('Mati', 'Perrito', 400),
('Luquitas', 'Caleffa', 5900),
('Santiaguito', 'Caleffa', 4000),
('Marcelita', 'De Leo', 6530);