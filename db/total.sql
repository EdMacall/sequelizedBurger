-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS burgers_db;

-- Creates the "todolist" database --
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers
(
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(50) NOT NULL,
  devoured BOOLEAN NOT NULL DEFAULT false,
  date DATETIME NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO burgers (burger_name, date) VALUES ('Big Bufford', NOW());
INSERT INTO burgers (burger_name, date) VALUES ('Whopper', NOW());
INSERT INTO burgers (burger_name, date) VALUES ('Big Mac', NOW());
INSERT INTO burgers (burger_name, date) VALUES ('Big Classic', NOW());
INSERT INTO burgers (burger_name, date) VALUES ('Whopper Jr.', NOW());
INSERT INTO burgers (burger_name, date) VALUES ('Une Royale avec Cheese', NOW());
INSERT INTO burgers (burger_name, date) VALUES ('Quarter Pounder with Cheese', NOW());