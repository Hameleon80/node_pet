USE pet;
DROP table IF EXISTS users;
CREATE table users(
id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
login VARCHAR(20) NOT NULL,
password VARCHAR(20) NOT NULL
);
INSERT INTO users (login, password) VALUES ('admin', 'Afhfjy71121');
INSERT INTO users (login, password) VALUES ('hameleon', 'Пкуе4Ьтс');